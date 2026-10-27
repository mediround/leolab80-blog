// 언어별 글 목록 — 한국어 원문과 번역본(영어·중국어)을 같은 모양으로 돌려준다.
// 번역본은 제목·설명·본문만 갖고, 카테고리·날짜·대표이미지는 같은 slug 의 한국어 글에서 가져온다.
import type { ImageMetadata } from 'astro';
import { type CollectionEntry, getCollection } from 'astro:content';
import { CATEGORY_SLUG, type Category } from '../consts';
import { LANG_META, LANGS, type Lang, type TranslatedLang } from '../i18n';

type Entry = CollectionEntry<'blog'> | CollectionEntry<'blogEn'> | CollectionEntry<'blogZh'>;

export interface Post {
	id: string;
	lang: Lang;
	title: string;
	description: string;
	pubDate: Date;
	updatedDate?: Date;
	category: Category;
	heroImage?: ImageMetadata;
	/** 글 상단 「핵심 요약」 — 그 언어의 본문 문장 그대로 */
	keyPoints?: string[];
	/** 본문 렌더용 원래 항목 */
	entry: Entry;
	/** 번역본: 검수(지니·Grammarly)를 다 마쳤는가. 한국어 = 항상 true */
	reviewed: boolean;
}

// 검수를 마치지 않은 번역본은 운영 사이트에 내보내지 않는다(대표 결정 2026-10-14: 테오 번역 → 지니 검수 → Grammarly → 게시).
// 미리보기(로컬 개발 · LEOLAB_PREVIEW=1 · Vercel 미리보기 배포)에서만 「검수 전」 표시와 noindex 를 달고 보여 준다.
// 환경 값이 비어 있으면 운영으로 본다(빠뜨려도 검수 전 번역이 새어 나가지 않게).
export const SHOW_UNREVIEWED =
	import.meta.env.DEV ||
	process.env.LEOLAB_PREVIEW === '1' ||
	['preview', 'development'].includes(process.env.VERCEL_ENV ?? '');

const REQUIRED_REVIEWS: Record<TranslatedLang, ('genieReviewed' | 'grammarlyChecked')[]> = {
	en: ['genieReviewed', 'grammarlyChecked'],
	zh: ['genieReviewed', 'grammarlyChecked'],
};

const COLLECTION: Record<TranslatedLang, 'blogEn' | 'blogZh'> = { en: 'blogEn', zh: 'blogZh' };
const warned = new Set<string>();

const byNewest = (a: Post, b: Post) => b.pubDate.valueOf() - a.pubDate.valueOf();

export async function getPosts(lang: Lang): Promise<Post[]> {
	const source = await getCollection('blog');
	if (lang === 'ko') {
		return source
			.map((e) => ({ id: e.id, lang, ...e.data, entry: e, reviewed: true }))
			.sort(byNewest);
	}
	const byId = new Map(source.map((e) => [e.id, e]));
	const list = (await getCollection(COLLECTION[lang])) as (CollectionEntry<'blogEn'> | CollectionEntry<'blogZh'>)[];
	const out: Post[] = [];
	for (const tr of list) {
		const ko = byId.get(tr.id);
		if (!ko) {
			if (!warned.has(`${lang}:${tr.id}:orphan`)) console.warn(`[i18n] ${lang}/${tr.id}: 같은 slug 의 한국어 글이 없어 건너뜀`);
			warned.add(`${lang}:${tr.id}:orphan`);
			continue;
		}
		// Grammarly 단계는 대표 결정으로 생략할 수 있다(grammarlySkipped 에 사유) — 날짜를 꾸며 적지 않는다
		const reviewed = REQUIRED_REVIEWS[lang].every(
			(k) => Boolean(tr.data[k]) || (k === 'grammarlyChecked' && Boolean(tr.data.grammarlySkipped)),
		);
		const koDate = ko.data.updatedDate ?? ko.data.pubDate;
		if (koDate.valueOf() > tr.data.sourceDate.valueOf() && !warned.has(`${lang}:${tr.id}:stale`)) {
			console.warn(`[i18n] ${lang}/${tr.id}: 한국어 글이 번역 뒤에 고쳐졌다(${koDate.toISOString()} > ${tr.data.sourceDate.toISOString()}) — 번역도 맞출 것`);
			warned.add(`${lang}:${tr.id}:stale`);
		}
		if (!reviewed && !SHOW_UNREVIEWED) continue;
		out.push({
			id: tr.id,
			lang,
			title: tr.data.title,
			description: tr.data.description,
			pubDate: ko.data.pubDate,
			updatedDate: ko.data.updatedDate,
			category: ko.data.category,
			heroImage: ko.data.heroImage,
			keyPoints: tr.data.keyPoints,
			entry: tr,
			reviewed,
		});
	}
	return out.sort(byNewest);
}

/** 게시할 글이 하나라도 있는 언어만 (한국어는 항상) */
export async function getActiveLangs(): Promise<Lang[]> {
	const active: Lang[] = [];
	for (const l of LANGS) {
		if (l === 'ko' || (await getPosts(l)).length > 0) active.push(l);
	}
	return active;
}

/** 이 글이 실제로 있는 언어 목록 */
export async function getPostLangs(id: string): Promise<Lang[]> {
	const langs: Lang[] = [];
	for (const l of LANGS) {
		if ((await getPosts(l)).some((p) => p.id === id)) langs.push(l);
	}
	return langs;
}

/**
 * 한국어 기준 경로 하나에 대해 언어별 주소를 만든다.
 * - hreflang: 같은 내용이 실제로 있는 언어만(검색엔진용 짝)
 * - toggle: 언어 토글이 갈 곳 — 같은 페이지가 없으면 그 언어의 홈
 */
export async function getAlternates(basePath: string): Promise<{
	hreflang: Partial<Record<Lang, string>>;
	toggle: Partial<Record<Lang, string>>;
}> {
	const active = await getActiveLangs();
	const hreflang: Partial<Record<Lang, string>> = {};
	const toggle: Partial<Record<Lang, string>> = {};
	const post = basePath.match(/^\/blog\/([^/]+)\/$/);
	const cat = basePath.match(/^\/category\/([^/]+)\/(?:\d+\/)?$/);
	for (const l of active) {
		const prefix = LANG_META[l].prefix;
		if (post) {
			const has = (await getPosts(l)).some((p) => p.id === post[1]);
			if (has) hreflang[l] = prefix + basePath;
			toggle[l] = has ? prefix + basePath : prefix + '/';
		} else if (cat) {
			const root = `/category/${cat[1]}/`;
			const has = (await getPosts(l)).some((p) => CATEGORY_SLUG[p.category] === cat[1]);
			if (has && basePath === root) hreflang[l] = prefix + root;
			toggle[l] = prefix + root;
		} else {
			hreflang[l] = prefix + basePath;
			toggle[l] = prefix + basePath;
		}
	}
	// 짝이 자기 하나뿐이면 hreflang 을 내지 않는다
	if (Object.keys(hreflang).length < 2) for (const k of Object.keys(hreflang)) delete hreflang[k as Lang];
	return { hreflang, toggle };
}

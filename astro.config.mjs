// @ts-check

import fs from 'node:fs';
import path from 'node:path';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

// 카테고리 → 슬러그 (consts.ts와 동일하게 유지)
const CATEGORY_SLUG = {
	'외국인환자 유치': 'inbound',
	'AI로 외국인환자 유치하기': 'ai-inbound',
	비즈니스: 'business',
	노트: 'notes',
};

// 사이트맵 <lastmod> 주입 — 각 글의 updatedDate(없으면 pubDate)에서 URL별 최종수정일을 계산.
// 구글이 "이 URL이 언제 바뀌었는지" 알아야 재크롤 우선순위를 매긴다(신선도 신호).
const blogDir = path.resolve('./src/content/blog');
const postLastmod = {}; // '/blog/<slug>/' -> ISO
const catNewest = {}; // 'notes' -> ms
let newestOverall = 0;
for (const file of fs.readdirSync(blogDir)) {
	if (!/\.mdx?$/.test(file)) continue;
	const slug = file.replace(/\.mdx?$/, '');
	const raw = fs.readFileSync(path.join(blogDir, file), 'utf8');
	const pick = (k) => raw.match(new RegExp('^' + k + ':\\s*["\']?([^"\'\\n]+)', 'm'))?.[1]?.trim();
	const when = new Date(pick('updatedDate') || pick('pubDate') || '');
	if (Number.isNaN(when.valueOf())) continue;
	postLastmod['/blog/' + slug + '/'] = when.toISOString();
	const ms = when.valueOf();
	if (ms > newestOverall) newestOverall = ms;
	const cslug = CATEGORY_SLUG[pick('category')];
	if (cslug && ms > (catNewest[cslug] || 0)) catNewest[cslug] = ms;
}
const newestOverallISO = newestOverall ? new Date(newestOverall).toISOString() : undefined;

// 번역본(/en · /zh, 2026-10-14)은 한국어 원문과 같은 날짜를 쓴다 — 언어 앞부분을 떼고 찾는다
const stripLang = (p) => p.replace(/^\/(en|zh)(?=\/)/, '');

function lastmodFor(url) {
	const p = stripLang(new URL(url).pathname);
	if (postLastmod[p]) return postLastmod[p];
	if (p === '/' || p === '/blog/') return newestOverallISO;
	const m = p.match(/^\/category\/([^/]+)\/$/);
	if (m && catNewest[m[1]]) return new Date(catNewest[m[1]]).toISOString();
	return undefined;
}

// https://astro.build/config
export default defineConfig({
	site: 'https://mediseed.kr',
	integrations: [
		mdx(),
		sitemap({
			// 글이 없는 카테고리 페이지는 sitemap에서 제외(얇은 페이지) — 글이 생기면 catNewest에 잡혀 자동 복귀
			// 언어별 같은 페이지를 사이트맵에서도 짝지어 준다(xhtml:link). 한국어 = 앞부분 없음
			i18n: { defaultLocale: 'ko', locales: { ko: 'ko', en: 'en', zh: 'zh-Hans' } },
			filter(page) {
				const m = stripLang(new URL(page).pathname).match(/^\/category\/([^/]+)\/$/);
				return !m || Boolean(catNewest[m[1]]);
			},
			serialize(item) {
				const lm = lastmodFor(item.url);
				if (lm) item.lastmod = lm;
				return item;
			},
		}),
		icon(),
	],
});

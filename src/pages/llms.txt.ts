import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { CATEGORY_SLUG, SITE_DESCRIPTION, SITE_TAGLINE, SITE_TITLE } from '../consts';

// llms.txt — AI 검색엔진/LLM용 사이트 안내 (https://llmstxt.org)
// 빌드 시 글 목록에서 자동 생성되므로 별도 관리가 필요 없다.
export async function GET(context: APIContext) {
	const site = context.site?.toString().replace(/\/$/, '') ?? 'https://mediseed.kr';
	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

	const byCategory = Object.entries(CATEGORY_SLUG).map(([category, slug]) => {
		const items = posts.filter((p) => p.data.category === category);
		if (items.length === 0) return '';
		return [
			`## ${category}`,
			'',
			...items.map((p) => `- [${p.data.title}](${site}/blog/${p.id}/): ${p.data.description}`),
			'',
		].join('\n');
	});

	const body = [
		`# ${SITE_TITLE}`,
		'',
		`> ${SITE_TAGLINE}. ${SITE_DESCRIPTION}`,
		'',
		'한국어 블로그. 외국인환자 유치 실무, 비즈니스 구조, 그리고 일하며 남기는 메모를 다룬다.',
		'',
		...byCategory.filter(Boolean),
		'## 기타',
		'',
		`- [소개](${site}/about/): 이 블로그를 쓰는 이유`,
		`- [전체 글 목록](${site}/blog/)`,
	].join('\n');

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
}

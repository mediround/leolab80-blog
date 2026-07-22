// @ts-check

import fs from 'node:fs';
import path from 'node:path';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { defineConfig, fontProviders } from 'astro/config';

// 카테고리 → 슬러그 (consts.ts와 동일하게 유지)
const CATEGORY_SLUG = {
	'외국인환자 유치': 'inbound',
	'AI로 외국인환자 유치하기': 'ai-inbound',
	비즈니스: 'business',
	메모: 'notes',
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

function lastmodFor(url) {
	const p = new URL(url).pathname;
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
			serialize(item) {
				const lm = lastmodFor(item.url);
				if (lm) item.lastmod = lm;
				return item;
			},
		}),
		icon(),
	],
	fonts: [
		{
			// 한글·라틴 공용 고딕 (맑은 고딕 계열) — Noto Sans KR
			provider: fontProviders.google(),
			name: 'Noto Sans KR',
			cssVariable: '--font-sans',
			weights: [400, 500, 700],
			fallbacks: ['Malgun Gothic', 'sans-serif'],
		},
	],
});

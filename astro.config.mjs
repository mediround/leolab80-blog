// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://mediseed.kr',
	integrations: [mdx(), sitemap(), icon()],
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

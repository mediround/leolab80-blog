import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			category: z.enum(['외국인환자 유치', 'AI로 외국인환자 유치하기', '비즈니스', '노트']),
			heroImage: z.optional(image()),
			// 글 상단 「핵심 요약」(2026-10-27 대표 지시 — 마이클리닉 글처럼 AI 친화적으로). 본문 문장을 그대로 3~4개
			keyPoints: z.array(z.string()).optional(),
		}),
});

// 번역본(2026-10-14 대표 결정) — slug = 한국어 글과 같다. 카테고리·날짜·대표이미지는 한국어 글에서 가져온다.
// 검수 날짜(genieReviewed·grammarlyChecked)가 다 차야 운영 사이트에 나간다 — src/lib/posts.ts
const translation = z.object({
	title: z.string(),
	description: z.string(),
	sourceDate: z.coerce.date(), // 번역한 한국어 글의 updatedDate(없으면 pubDate)
	genieReviewed: z.coerce.date().optional(),
	grammarlyChecked: z.coerce.date().optional(),
	// Grammarly 를 거치지 못하고 대표 결정으로 게시한 경우 그 사유(검수한 것처럼 날짜를 적지 않는다)
	grammarlySkipped: z.string().optional(),
	// 한국어 keyPoints 와 같은 순서·같은 개수 — 번역문의 해당 문장을 그대로
	keyPoints: z.array(z.string()).optional(),
});

const blogEn = defineCollection({
	loader: glob({ base: './src/content/blog-en', pattern: '**/*.{md,mdx}' }),
	schema: translation,
});

const blogZh = defineCollection({
	loader: glob({ base: './src/content/blog-zh', pattern: '**/*.{md,mdx}' }),
	schema: translation,
});

export const collections = { blog, blogEn, blogZh };

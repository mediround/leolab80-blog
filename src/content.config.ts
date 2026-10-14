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

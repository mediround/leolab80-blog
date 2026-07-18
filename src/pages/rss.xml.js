import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			// GA4 유입 추적: RSS 리더에서 클릭한 방문을 rss/feed 소스로 집계.
			// 절대 URL로 넘겨야 @astrojs/rss가 쿼리스트링을 건드리지 않는다(isValidURL 분기 → 그대로 사용).
			// ⚠️ 이 버전(4.0.19)은 guid를 link에서 파생하므로 guid에도 UTM이 포함된다(커스텀 guid 미지원).
			link: `${new URL(`/blog/${post.id}/`, context.site).href}?utm_source=rss&utm_medium=feed`,
		})),
	});
}

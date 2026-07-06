// 사이트 전역 상수. 어디서든 import 해서 사용.

export const SITE_TITLE = 'LEOLAB80';
export const SITE_TAGLINE = '외국인환자 유치를 잘하고 싶어서 만든 블로그';
export const SITE_DESCRIPTION =
	'외국인환자 유치와 비즈니스, 그리고 그 사이의 메모. LEO가 직접 쓰는 기록.';

export const CATEGORIES = ['외국인환자 유치', '비즈니스', '메모'] as const;
export type Category = (typeof CATEGORIES)[number];

// 카테고리 → URL 슬러그 (한글 경로 대신 안정적인 라틴 슬러그)
export const CATEGORY_SLUG: Record<Category, string> = {
	'외국인환자 유치': 'inbound',
	비즈니스: 'business',
	메모: 'notes',
};

export const SOCIALS = {
	instagram: 'https://www.instagram.com/leolab_80/',
	youtube: 'https://www.youtube.com/@LEOLAB80',
	linkedin: 'https://www.linkedin.com/in/leolab80/',
};

// 애널리틱스 / 서치콘솔 — 값을 채우면 자동 활성화(빈 값이면 아무 코드도 안 나감).
// GA는 프로덕션 빌드에서만 로드된다(개발 중 데이터 오염 방지).
export const GA_MEASUREMENT_ID = ''; // 예: 'G-XXXXXXXXXX' (GA4 측정 ID)
export const GSC_VERIFICATION = ''; // Search Console HTML 태그 인증 코드(google-site-verification content 값)

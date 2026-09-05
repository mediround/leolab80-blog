// 사이트 전역 상수. 어디서든 import 해서 사용.

export const SITE_TITLE = 'LEOLAB80';
export const SITE_TAGLINE = '외국인환자 유치를 잘하고 싶어서 만든 블로그';
export const SITE_DESCRIPTION =
	'외국인환자 유치와 비즈니스, 그리고 그 사이의 메모. LEO가 직접 쓰는 기록.';

export const CATEGORIES = ['외국인환자 유치', 'AI로 외국인환자 유치하기', '비즈니스', '메모'] as const;
export type Category = (typeof CATEGORIES)[number];

// 카테고리 → URL 슬러그 (한글 경로 대신 안정적인 라틴 슬러그)
export const CATEGORY_SLUG: Record<Category, string> = {
	'외국인환자 유치': 'inbound',
	'AI로 외국인환자 유치하기': 'ai-inbound',
	비즈니스: 'business',
	메모: 'notes',
};

// JSON-LD Person (검색엔진·AI용 저자 신원 — 이전 결정문서 SEO/GEO 원칙: 실명)
export const AUTHOR = {
	name: '신영종',
	alternateName: 'LEO',
	// E-E-A-T·GEO: 저자 엔티티 보강 (사실만 — 2026-09-05)
	jobTitle: '메디라운드 대표',
	worksFor: { name: '메디라운드', url: 'https://mediround.co.kr' },
	knowsAbout: ['외국인환자 유치', '의료관광', '마이클리닉'],
	bio: '외국인환자 유치를 잘하고 싶은 사람. MyClinic을 개발하고 운영합니다.', // 대표 확정 2026-09-05
};

export const SOCIALS = {
	instagram: 'https://www.instagram.com/leolab_80/',
	x: 'https://x.com/leolab80',
	linkedin: 'https://www.linkedin.com/in/leolab80/',
	youtube: 'https://www.youtube.com/@LEOLAB80',
};

// 애널리틱스 / 서치콘솔 — 값을 채우면 자동 활성화(빈 값이면 아무 코드도 안 나감).
// GA는 프로덕션 빌드에서만 로드된다(개발 중 데이터 오염 방지).
export const GA_MEASUREMENT_ID = 'G-X4YJYKKB90'; // GA4 측정 ID (LEO LAB · mediseed.kr 스트림)
export const GSC_VERIFICATION = ''; // Search Console HTML 태그 인증 코드(google-site-verification content 값)
export const NAVER_VERIFICATION = 'affd60e90b89b58384544ab073693cb26f827446'; // 네이버 서치어드바이저 소유확인 (2026-07-12)

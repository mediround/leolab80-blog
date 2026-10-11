// 사이트 전역 상수. 어디서든 import 해서 사용.

export const SITE_TITLE = 'LEOLAB80';
export const SITE_TAGLINE = '외국인환자 유치를 잘하고 싶어서 만든 블로그';
export const SITE_DESCRIPTION =
	'외국인환자 유치와 비즈니스, 그리고 그 사이의 메모. LEO가 직접 쓰는 기록.';

export const CATEGORIES = ['외국인환자 유치', 'AI로 외국인환자 유치하기', '비즈니스', '노트'] as const;
export type Category = (typeof CATEGORIES)[number];

// 카테고리 → URL 슬러그 (한글 경로 대신 안정적인 라틴 슬러그)
export const CATEGORY_SLUG: Record<Category, string> = {
	'외국인환자 유치': 'inbound',
	'AI로 외국인환자 유치하기': 'ai-inbound',
	비즈니스: 'business',
	노트: 'notes', // 2026-10-09 「메모」→「노트」 이름 변경(주소 notes 에 맞춤 · 대표 지시) · 주소는 그대로 /category/notes/
};

// 검색 결과·공유 미리보기용 설명문 (60~120자 · 2026-10-11 대표 지시로 보강 — 짧으면 구글이 본문을 임의로 발췌한다)
export const ABOUT_DESCRIPTION =
	'2009년부터 외국인환자 유치 일을 해왔고, 지금은 MyClinic을 만들고 운영하는 LEO의 소개. 현장에서 만난 문제와 고민, 선택을 기록하려고 LEOLAB80을 만들었다.';
export const BLOG_DESCRIPTION =
	'LEOLAB80의 모든 글을 최신 순으로 모았다. 외국인환자 유치 현장에서 겪은 일과 AI로 유치 일을 해 본 기록, 그 사이의 생각을 LEO가 직접 쓴다.';
export const CATEGORY_DESCRIPTION: Record<Category, string> = {
	'외국인환자 유치':
		'2009년부터 외국인환자 유치 일을 해 온 LEO가 현장에서 본 것을 정리한 글. 유치 비용, 달라진 고객, 중개의 역할처럼 이 일을 하며 만난 문제를 다룬다.',
	'AI로 외국인환자 유치하기':
		'AI와 함께 외국인환자 유치 일을 해 본 기록. ChatGPT, Claude Code와 콘텐츠를 만들고 고객 안내를 준비하며 AI에게 맡길 일과 사람이 확인할 일을 나눠 본다.',
	비즈니스:
		'외국인환자 유치를 하며 마주한 비즈니스 질문을 정리한 글. 고객과 시장, 제품과 수익을 어떻게 볼지 LEO가 읽고 겪은 것을 바탕으로 적는다.',
	노트: 'LEO가 일하며 남기는 짧은 노트. 블로그를 운영하고 서비스를 만들며 배운 것, 아직 답을 찾지 못한 질문을 그때그때 적어 둔다.',
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

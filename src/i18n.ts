// 다국어(한국어 원문 · 영어 · 중국어 간체) — 2026-10-14 대표 결정
// 원문은 언제나 한국어 글이다. 영어·중국어는 번역본이며 주소 앞에 /en · /zh 가 붙는다(한국어 주소는 그대로).
// 화면 문구는 이 파일 한 곳에서만 관리한다. 번역 규칙·용어집 = docs/translation-guide.md
import {
	ABOUT_DESCRIPTION,
	AUTHOR,
	BLOG_DESCRIPTION,
	CATEGORY_DESCRIPTION,
	type Category,
	SITE_DESCRIPTION,
	SITE_TAGLINE,
} from './consts';

export const LANGS = ['ko', 'en', 'zh'] as const;
export type Lang = (typeof LANGS)[number];
export const TRANSLATED_LANGS = ['en', 'zh'] as const;
export type TranslatedLang = (typeof TRANSLATED_LANGS)[number];

export const LANG_META: Record<
	Lang,
	{ htmlLang: string; hreflang: string; ogLocale: string; label: string; prefix: string; dateLocale: string }
> = {
	ko: { htmlLang: 'ko', hreflang: 'ko', ogLocale: 'ko_KR', label: '한국어', prefix: '', dateLocale: 'ko' },
	en: { htmlLang: 'en', hreflang: 'en', ogLocale: 'en_US', label: 'English', prefix: '/en', dateLocale: 'en' },
	zh: { htmlLang: 'zh-Hans', hreflang: 'zh-Hans', ogLocale: 'zh_CN', label: '中文', prefix: '/zh', dateLocale: 'zh' },
};

/** 한국어 기준 경로(/blog/x/)를 해당 언어 경로로 바꾼다 */
export function localizePath(path: string, lang: Lang): string {
	return LANG_META[lang].prefix + path;
}

/** 언어가 붙은 경로에서 언어와 한국어 기준 경로를 꺼낸다 */
export function splitLangPath(pathname: string): { lang: Lang; basePath: string } {
	for (const l of TRANSLATED_LANGS) {
		const p = LANG_META[l].prefix;
		if (pathname === p || pathname === p + '/') return { lang: l, basePath: '/' };
		if (pathname.startsWith(p + '/')) return { lang: l, basePath: pathname.slice(p.length) };
	}
	return { lang: 'ko', basePath: pathname };
}

type Dict = {
	siteTagline: string;
	siteDescription: string;
	blogDescription: string;
	aboutDescription: string;
	categories: Record<Category, string>;
	categoryDescriptions: Record<Category, string>;
	navLabel: string;
	menu: string;
	close: string;
	langLabel: string;
	seeAll: string;
	allPosts: string;
	related: string;
	home: string;
	crumbsLabel: string;
	updated: string;
	emptyCategory: string;
	prev: string;
	next: string;
	pagerLabel: string;
	share: { label: string; facebook: string; x: string; linkedin: string; copy: string; copied: string };
	social: { instagram: string; x: string; linkedin: string; youtube: string };
	author: { label: string; jobTitle: string; bio: string; photoAlt: string; aboutLink: string };
	contact: {
		title: string;
		email: string;
		subject: string;
		message: string;
		send: string;
		sending: string;
		sent: string;
		sentStatus: string;
		tooMany: string;
		failed: string;
	};
	notice?: { text: string; original: string; preview: string };
	about: string[];
};

export const UI: Record<Lang, Dict> = {
	ko: {
		siteTagline: SITE_TAGLINE, // 한국어 값의 원본 = consts.ts (RSS·llms.txt 와 공유)
		siteDescription: SITE_DESCRIPTION,
		blogDescription: BLOG_DESCRIPTION,
		aboutDescription: ABOUT_DESCRIPTION,
		categories: {
			'외국인환자 유치': '외국인환자 유치',
			'AI로 외국인환자 유치하기': 'AI로 외국인환자 유치하기',
			비즈니스: '비즈니스',
			노트: '노트',
		},
		categoryDescriptions: CATEGORY_DESCRIPTION,
		navLabel: '카테고리',
		menu: '메뉴',
		close: '닫기',
		langLabel: '언어 선택',
		seeAll: '전체 보기 →',
		allPosts: '전체 글',
		related: '함께 읽기',
		home: '홈',
		crumbsLabel: '이동 경로',
		updated: '수정',
		emptyCategory: '아직 이 카테고리의 글이 없습니다.',
		prev: '‹ 이전',
		next: '다음 ›',
		pagerLabel: '페이지',
		share: {
			label: '이 글 공유',
			facebook: '페이스북에 공유',
			x: 'X(트위터)에 공유',
			linkedin: '링크드인에 공유',
			copy: '링크 복사',
			copied: '복사됨',
		},
		social: { instagram: '인스타그램', x: '엑스', linkedin: '링크드인', youtube: '유튜브' },
		author: {
			label: '글쓴이',
			jobTitle: AUTHOR.jobTitle,
			bio: AUTHOR.bio,
			photoAlt: 'LEO(신영종) 프로필 사진',
			aboutLink: 'LEO 소개 →',
		},
		contact: {
			title: 'LEO에게 메일 보내기',
			email: '이메일',
			subject: '제목',
			message: '내용',
			send: '보내기',
			sending: '보내는 중…',
			sent: '보냈습니다',
			sentStatus: '문의가 전달되었습니다. 확인한 뒤 메일로 답장드리겠습니다.',
			tooMany: '짧은 시간에 여러 번 보내셨습니다. 잠시 뒤에 다시 보내 주세요.',
			failed: '보내지 못했습니다. 입력하신 내용은 그대로 있으니 잠시 뒤에 다시 보내 주세요.',
		},
		about: [
			'안녕하세요. LEO입니다. 2009년부터 외국인환자 유치 일을 해왔고, 지금은 MyClinic을 만들고 운영하고 있습니다.',
			'저는 새로운 것을 찾아보고, 익숙한 일을 다른 각도에서 생각하고, 그 생각을 구체적인 무언가로 만드는 일을 좋아합니다. 경험한 일들을 연결해 하나의 이야기로 풀어내는 것도 좋아합니다. 다만 생각을 실제 서비스로 만들고, 그것을 꾸준한 성과로 이어가는 일에는 여전히 풀어야 할 숙제가 많습니다.',
			'외국인환자 유치 일을 하며 그런 숙제를 자주 만났습니다. 해외에 병원을 알리고 외국인의 문의에 답하는 것부터 서로 다른 기대를 맞추는 일까지, 외국인환자 한 명을 유치하는 데 많은 시간과 노력이 들어갑니다. 그럼에도 그 노력이 고객의 만족과 사업의 수익으로 이어지는 과정은 간단하지 않았습니다. 눈앞의 일을 처리하면서도, 비슷한 어려움이 왜 계속 반복되는지 알고 싶었습니다.',
			'오래 해왔다는 이유만으로 같은 일을 계속하고 싶지는 않습니다. 그동안의 경험을 바탕으로 누군가에게 쓸모 있는 것을 만들 수 있을지, 그 일이 저에게도 계속할 이유가 될 수 있을지 생각합니다. 해온 일을 돌아보는 과정에서 제가 좋아하는 일과 잘하고 싶은 일, 실제로 책임져야 하는 현실을 함께 살펴보게 됐습니다.',
			'현장에서 겪은 어려움을 다시 들여다보면 새로운 가능성도 보입니다. 내가 겪는 문제를 다른 업체와 병원도 겪고 있다면, 그 문제를 해결하는 방법 자체가 서비스가 될 수 있지 않을까. 고객에게 도움이 되고, 그 도움을 제공하는 사람도 지속적으로 일할 수 있는 방법을 만들 수 있지 않을까.',
			'MyClinic은 이 질문을 실제 서비스로 풀어보려는 시도입니다. 외국인이 한국의 의료를 이해하고 방문을 준비하는 과정에서 겪는 불편을 줄이고 싶습니다. 필요한 정보를 어떻게 전달하고, 어떤 내용을 확인하며, 다음 단계를 어떻게 안내할지 생각하고 있습니다. 현장에서 얻은 경험을 여러 사람이 함께 쓸 수 있는 방식으로 만들어 보고 싶습니다.',
			'AI에 관심을 갖고 함께 일하는 방법을 배우는 것도 이 고민과 이어져 있습니다. 제 생각을 구체적인 결과물로 만들고, 반복해서 해야 하는 일을 줄이고, 제가 중요하게 여기는 판단에 더 집중할 수 있을지 살펴보고 있습니다. 서비스를 만들어 가는 과정에서 AI에게 무엇을 맡길 수 있는지, 어떤 부분은 제가 이해하고 확인해야 하는지도 배우고 있습니다.',
			'이 블로그 LEOLAB80은 그 과정을 제 언어로 남기고 나누기 위해 만든 공간입니다. 일을 계속해 나가는 동안 어떤 문제를 만났고, 무엇 때문에 고민했으며, 왜 그런 선택을 했는지 기록하고 싶습니다. 기록하면서 제 생각을 정리하고, 시간이 흐른 뒤에도 그때의 판단을 다시 살펴볼 수 있기를 바랍니다.',
			'이곳을 LAB이라고 부르는 것은 직접 해보고 배우는 과정을 담고 싶기 때문입니다. 잘 풀리지 않은 시도와 아직 답을 찾지 못한 질문도 그 과정에 포함됩니다. 시간이 지나 생각이 달라진다면 무엇 때문에 달라졌는지도 적어두려 합니다. 그렇게 쌓인 기록을 통해 제가 어떤 일을 하며 어떤 삶을 찾고 있는지 스스로 이해하고, 비슷한 고민을 하는 분들과 나누고 싶습니다.',
		],
	},
	en: {
		siteTagline: 'A blog I started to get better at attracting international patients',
		siteDescription:
			'Notes on attracting international patients to Korea, on business, and on what lies in between. Written by LEO.',
		blogDescription:
			'Every LEOLAB80 post, newest first. LEO writes about what he has seen while attracting international patients, what he has tried with AI, and the thinking in between.',
		aboutDescription:
			'About LEO, who has worked in international patient attraction since 2009 and now builds and runs MyClinic. LEOLAB80 is where he records the problems, questions, and choices he meets along the way.',
		categories: {
			'외국인환자 유치': 'International Patients',
			'AI로 외국인환자 유치하기': 'AI for International Patients',
			비즈니스: 'Business',
			노트: 'Notes',
		},
		categoryDescriptions: {
			'외국인환자 유치':
				'What LEO has seen in the field since he started attracting international patients in 2009: acquisition costs, changing customers, and the role of the broker.',
			'AI로 외국인환자 유치하기':
				'A record of attracting international patients with AI. Working with ChatGPT and Claude Code on content and customer guidance, and sorting out what to hand to AI and what people must check.',
			비즈니스:
				'Business questions LEO has faced while attracting international patients: how to look at customers and markets, products and revenue, based on what he has read and lived through.',
			노트: 'Short notes LEO writes as he works: lessons from running this blog and building a service, and questions he has not answered yet.',
		},
		navLabel: 'Categories',
		menu: 'Menu',
		close: 'Close',
		langLabel: 'Language',
		seeAll: 'View all →',
		allPosts: 'All posts',
		related: 'Read next',
		home: 'Home',
		crumbsLabel: 'Breadcrumb',
		updated: 'Updated',
		emptyCategory: 'No posts in this category yet.',
		prev: '‹ Previous',
		next: 'Next ›',
		pagerLabel: 'Pages',
		share: {
			label: 'Share this post',
			facebook: 'Share on Facebook',
			x: 'Share on X (Twitter)',
			linkedin: 'Share on LinkedIn',
			copy: 'Copy link',
			copied: 'Copied',
		},
		social: { instagram: 'Instagram', x: 'X', linkedin: 'LinkedIn', youtube: 'YouTube' },
		author: {
			label: 'Author',
			jobTitle: 'CEO, Mediround',
			bio: 'Someone who wants to get better at attracting international patients. I build and run MyClinic.',
			photoAlt: 'Profile photo of LEO',
			aboutLink: 'About LEO →',
		},
		contact: {
			title: 'Email LEO',
			email: 'Email',
			subject: 'Subject',
			message: 'Message',
			send: 'Send',
			sending: 'Sending…',
			sent: 'Sent',
			sentStatus: 'Your message has been delivered. I will read it and reply by email.',
			tooMany: 'You sent several messages in a short time. Please try again in a moment.',
			failed: 'Your message could not be sent. What you typed is still here, so please try again in a moment.',
		},
		notice: {
			text: 'This post was translated from the Korean original with AI and reviewed before publishing.',
			original: 'Read the original (Korean) →',
			preview: 'Preview — review not finished',
		},
		about: [
			"Hi, I'm LEO. I have worked in international patient attraction since 2009, and today I build and run MyClinic.",
			'I like looking for new things, thinking about familiar work from a different angle, and turning those thoughts into something concrete. I also like connecting my experiences into a single story. But turning ideas into a real service, and turning that service into steady results, still leaves me with plenty of homework.',
			'I ran into that homework often while attracting international patients. From promoting hospitals overseas and answering inquiries from abroad to aligning different expectations, bringing in a single international patient takes a lot of time and effort. Even so, turning that effort into customer satisfaction and business revenue was never simple. While handling the work in front of me, I wanted to understand why the same difficulties kept coming back.',
			"I don't want to keep doing the same work just because I have done it for a long time. I think about whether I can use my experience to make something useful for someone, and whether that work can also give me a reason to keep going. Looking back on what I have done, I found myself examining what I like doing, what I want to do well, and the realities I am actually responsible for.",
			"When I look again at the difficulties I have faced in the field, I also see new possibilities. If other agencies and hospitals face the same problems I do, couldn't the way of solving them become a service in itself? Couldn't I build a way that helps customers and also lets the people who provide that help keep working sustainably?",
			'MyClinic is an attempt to answer that question with a real service. I want to reduce the friction international visitors face as they try to understand Korean medical care and prepare for a visit. I am thinking about how to deliver the information they need, what to verify, and how to guide them to the next step. I want to turn what I have learned in the field into something many people can use together.',
			'My interest in AI, and in learning how to work with it, connects to the same question. I am exploring whether it can help me turn my ideas into concrete results, cut down repetitive work, and focus more on the judgments that matter to me. While building the service, I am also learning what I can hand over to AI and what I need to understand and check myself.',
			'This blog, LEOLAB80, is a place to record and share that process in my own words. As I keep going, I want to write down the problems I met, what I struggled with, and why I made the choices I did. Writing helps me organize my thinking, and I hope it lets me revisit those judgments later.',
			"I call it a LAB because I want it to hold the process of trying things and learning by doing. That process includes attempts that didn't work out and questions I haven't answered yet. If my thinking changes over time, I will note what changed it. Through these records, I hope to understand what kind of work I am doing and what kind of life I am looking for, and to share that with people who have similar questions.",
		],
	},
	zh: {
		siteTagline: '为了把外国患者招揽做好而写的博客',
		siteDescription: '关于外国患者招揽、商业，以及两者之间的思考。由 LEO 亲自撰写的记录。',
		blogDescription:
			'按时间倒序汇集 LEOLAB80 的全部文章。LEO 亲自记录在外国患者招揽一线的经历、用 AI 做招揽工作的尝试，以及其间的思考。',
		aboutDescription:
			'LEO 的自我介绍。他从2009年开始从事外国患者招揽工作，现在开发和运营 MyClinic。LEOLAB80 用来记录他在一线遇到的问题、思考和选择。',
		categories: {
			'외국인환자 유치': '外国患者招揽',
			'AI로 외국인환자 유치하기': '用 AI 招揽外国患者',
			비즈니스: '商业',
			노트: '笔记',
		},
		categoryDescriptions: {
			'외국인환자 유치':
				'自2009年起从事外国患者招揽的 LEO 整理的一线观察，涉及招揽成本、不断变化的客户、中介的角色等这份工作中遇到的问题。',
			'AI로 외국인환자 유치하기':
				'与 AI 一起做外国患者招揽的记录。和 ChatGPT、Claude Code 一起制作内容、准备客户指引，并梳理哪些事交给 AI、哪些需要人来确认。',
			비즈니스: '整理在外国患者招揽中遇到的商业问题。LEO 根据自己的阅读和经历，写下如何看待客户与市场、产品与收益。',
			노트: 'LEO 在工作中随手写下的简短笔记：运营博客、打造服务时学到的东西，以及尚未找到答案的问题。',
		},
		navLabel: '分类',
		menu: '菜单',
		close: '关闭',
		langLabel: '语言',
		seeAll: '查看全部 →',
		allPosts: '全部文章',
		related: '相关阅读',
		home: '首页',
		crumbsLabel: '导航路径',
		updated: '更新',
		emptyCategory: '此分类暂无文章。',
		prev: '‹ 上一页',
		next: '下一页 ›',
		pagerLabel: '分页',
		share: {
			label: '分享本文',
			facebook: '分享到 Facebook',
			x: '分享到 X（Twitter）',
			linkedin: '分享到 LinkedIn',
			copy: '复制链接',
			copied: '已复制',
		},
		social: { instagram: 'Instagram', x: 'X', linkedin: 'LinkedIn', youtube: 'YouTube' },
		author: {
			label: '作者',
			jobTitle: 'Mediround 代表',
			bio: '想把外国患者招揽做好的人。开发并运营 MyClinic。',
			photoAlt: 'LEO 的头像',
			aboutLink: '关于 LEO →',
		},
		contact: {
			title: '给 LEO 发邮件',
			email: '邮箱',
			subject: '主题',
			message: '内容',
			send: '发送',
			sending: '发送中…',
			sent: '已发送',
			sentStatus: '您的留言已送达。我确认后会通过邮件回复。',
			tooMany: '您在短时间内发送了多次，请稍后再试。',
			failed: '发送失败。您填写的内容仍保留在页面上，请稍后再试。',
		},
		notice: {
			text: '本文由韩语原文经 AI 翻译，并在发布前经过审校。',
			original: '阅读韩语原文 →',
			preview: '预览 — 审校尚未完成',
		},
		about: [
			'你好，我是 LEO。我从2009年开始从事外国患者招揽工作，现在开发和运营 MyClinic。',
			'我喜欢寻找新事物，从不同角度思考熟悉的工作，再把这些想法变成具体的东西。我也喜欢把经历过的事情串联起来，讲成一个完整的故事。不过，把想法做成真正的服务，并让它持续带来成果，对我来说仍有很多课题要解决。',
			'在从事外国患者招揽的过程中，我经常遇到这样的课题。从向海外介绍医院、回复外国人的咨询，到协调彼此不同的期待，招揽一位外国患者需要投入大量的时间和精力。即便如此，让这些努力转化为客户的满意和企业的收益，这个过程从来都不简单。在处理眼前工作的同时，我也想弄清楚为什么类似的困难总是反复出现。',
			'我不想仅仅因为做了很久，就一直做同样的事。我在思考，能否凭借这些年的经验做出对别人有用的东西，这件事又能否成为我继续做下去的理由。在回顾过去工作的过程中，我开始同时审视自己喜欢的事、想做好的事，以及实际需要承担的现实。',
			'重新审视在一线遇到的困难，也能看到新的可能性。如果其他机构和医院也面临和我一样的问题，那么解决这些问题的方法本身，能不能成为一项服务？能不能找到一种方式，既能帮助客户，也能让提供帮助的人持续工作下去？',
			'MyClinic 就是把这个问题落实为真正服务的一次尝试。我希望减少外国人在了解韩国医疗、准备来访的过程中遇到的不便。我在思考如何传达他们需要的信息、需要确认哪些内容，以及如何引导下一步。我想把在一线积累的经验，做成许多人可以共同使用的方式。',
			'关注 AI、学习如何与 AI 一起工作，也和这些思考相连。我在探索能否借助 AI 把想法变成具体成果、减少重复性工作，并更专注于我所重视的判断。在打造服务的过程中，我也在学习哪些事可以交给 AI，哪些部分需要我自己理解和确认。',
			'LEOLAB80 这个博客，是为了用我自己的语言记录并分享这个过程而建立的空间。在继续工作的同时，我想记下遇到了什么问题、为什么而苦恼、又为什么做出那样的选择。通过记录，我希望整理自己的想法，也希望将来还能回头审视当时的判断。',
			'之所以把这里叫作 LAB，是因为我想记录亲自尝试、边做边学的过程。其中也包括没有成功的尝试和尚未找到答案的问题。如果随着时间推移想法发生了变化，我也会写下变化的原因。希望通过这样积累的记录，我能理解自己在做什么样的工作、在寻找什么样的生活，并与有类似思考的人分享。',
		],
	},
};

export function t(lang: Lang): Dict {
	return UI[lang];
}

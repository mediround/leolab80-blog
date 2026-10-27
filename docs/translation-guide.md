# LEOLAB80 번역 가이드 (영어 · 중국어 간체)

> 2026-10-14 대표 결정: 기존 8편과 앞으로의 글을 영어·중국어(간체)로도 게시한다.
> **역할(대표 재정립 2026-10-14 저녁 — 앞으로의 글에 적용)**: 한국어 원고 = 지니 초안 → 대표 수정·완성 · **번역 = 지니가 영어·중국어 번역문까지 완성 → Grammarly 검수 → 테오는 별도 검수 없이 업로드만.**
> - 지니 몫: 번역 완성 · Grammarly 검수(반영/미반영) · 인계(`#ai_cowork`).
> - 테오 몫: 업로드 — 번역문을 `blog-en|blog-zh/<slug>.md` 로 옮기기(문장 수정 없음, 그림·표 마크업은 원문 그대로 유지) · 머리말 날짜 · 빌드 · 배포 · 공개 확인(페이지가 열리는지, 화면이 깨지지 않는지). 역번역 대조·문장 다듬기·내용 검수는 하지 않는다.
> - 이전(10-14 오후) 원칙 「테오 1차 번역 → 지니 검수 → Grammarly」는 기존 8편에 적용했다(이력).
> 원문은 언제나 한국어 글(`src/content/blog/<slug>.md`)이다. 번역본은 원문을 대신하지 않는다.

## 1. 파일 위치와 머리말

- 영어: `src/content/blog-en/<slug>.md` · 중국어(간체): `src/content/blog-zh/<slug>.md` — slug 는 한국어 글과 같다.
- 머리말은 아래 필드만 쓴다. 카테고리·날짜·대표이미지는 한국어 글에서 가져오므로 적지 않는다.

```yaml
---
title: "…"            # 번역 제목
description: "…"      # 번역 설명문 (영어 120~160자 · 중국어 50~90자)
sourceDate: "…"       # 번역한 한국어 글의 updatedDate(없으면 pubDate) 값을 그대로
genieReviewed: …      # 지니가 번역을 완성(또는 검수)한 날짜 — 인계 글 기준 (없으면 줄 자체를 넣지 않는다)
grammarlyChecked: …   # Grammarly 검수를 마친 날짜 — 인계 글 기준 (검수 전에는 넣지 않는다)
grammarlySkipped: "…" # Grammarly 를 못 거치고 대표 결정으로 게시할 때만 — 사유와 날짜(검수한 것처럼 grammarlyChecked 를 적지 않는다)
---
```

- 운영 빌드(`VERCEL_ENV=production`)는 검수 날짜가 다 찬 번역본만 게시한다. 영어 = `genieReviewed` + `grammarlyChecked`, 중국어 = `genieReviewed` + `grammarlyChecked`(Grammarly 중국어 검사가 안 되면 대표 결정에 따른다).
- 한국어 글이 고쳐져 `updatedDate` 가 `sourceDate` 보다 늦으면 빌드가 경고한다 → 번역도 다시 맞춘다.

## 2. 번역 원칙

1. **뜻을 더하지도 빼지도 않는다.** 문단 수·문장 순서·강조(굵게)·목록·표·그림은 원문과 1:1 로 맞춘다. 설명을 덧붙이거나 줄이지 않는다.
2. **대표의 말투를 옮긴다.** 1인칭(I / 我), 짧고 담백한 문장. 원문보다 화려하게·단정적으로 쓰지 않는다. 최상급·보장 표현을 새로 만들지 않는다.
3. **자연스러운 글.** 직역투를 피하고 그 언어 독자가 처음부터 그 언어로 쓴 글처럼 읽히게 한다. 단 뜻이 바뀌면 안 된다.
4. **숫자·연도·고유명사는 원문 그대로.** 환율 환산·새 수치·새 출처를 넣지 않는다. 「약 6만 명」= about 60,000 / 约6万人.
5. **금지선 그대로**: 병원 이름을 새로 넣지 않는다 · 「platform / 平台」 어휘는 원문에 「플랫폼」이 있을 때만 · AI 로 만든 사실 위조 표현 없음.
6. **마크업은 그대로 둔다.** HTML 태그·class·style·SVG 도형은 한 글자도 바꾸지 않는다. 바꾸는 것은 글자(텍스트 노드)와 `alt`·`aria-label`·`title` 속성뿐이다.
7. **링크**
   - 블로그 안 링크 `/blog/<slug>/` → 영어 `/en/blog/<slug>/` · 중국어 `/zh/blog/<slug>/`.
   - 바깥 링크 주소는 그대로. 링크한 페이지가 한국어면 링크 문구 뒤에 ` (in Korean)` / `（韩文）` 를 붙인다.
   - 책·논문 제목은 공식 번역 제목이 있으면 그것을, 없으면 원제(영문)를 쓴다.

## 3. 용어집

| 한국어 | English | 简体中文 |
|---|---|---|
| 외국인환자 | international patient(s) | 外国患者 |
| 외국인환자 유치 | attracting international patients (명사구: international patient attraction) · **메뉴·분류 이름 = Medical Tourism** | 吸引国际患者 · **메뉴·분류 이름 = 医疗旅游** · ⛔ 招揽 쓰지 않음(2026-10-27 대표 — 대만 의료법 제61조 「招攬病人」 금지 표현 · 본토 医托 연상) |
| 유치업 / 유치업체 / 유치업자 | international patient facilitation (business) / facilitator(s) | (招揽 대체어 미정 — 다음 번역 때 지니가 확정. 「招揽」 쓰지 않음) |
| 유치 수수료 | facilitation fee | (招揽 대체어 미정 — 다음 번역 때 지니가 확정. 「招揽」 쓰지 않음) |
| 중개 / 중개업체 | brokering / broker(s), intermediary | 中介 / 中介机构 |
| 의료관광 | medical tourism | 医疗旅游 |
| 의료통역코디네이터 | medical interpreter-coordinator | 医疗翻译协调员 |
| 코디네이터 | coordinator | 协调员 |
| 병원 | hospital(s) / clinic(s) — 문맥에 맞게 (성형·피부·치과·안과 개원가는 clinic) | 医院 / 诊所 |
| 협력 병원 | partner clinic(s) | 合作医院 |
| 시술 | procedure(s) / treatment(s) | 项目 / 治疗 |
| 실환자 (통계) | patients (unique count) | 实际患者人数 |
| 고객획득비용 (CAC) | customer acquisition cost (CAC) | 获客成本（CAC） |
| 생애가치 (LTV) | lifetime value (LTV) | 客户终身价值（LTV） |
| 단위경제 | unit economics | 单位经济 |
| 고객가치사슬 | Customer Value Chain | 客户价值链 |
| 디커플링 | decoupling | 解耦（Decoupling） |
| 캐즘 | the chasm | 鸿沟 |
| 바이브코딩 | vibe coding | 氛围编程（vibe coding） |
| 중화권 | Greater China / Chinese-speaking markets | 中华圈 |
| K문화 · K뷰티 | K-culture · K-beauty | 韩流文化 · 韩国美妆 |
| 중의사 | doctor of traditional Chinese medicine | 中医师 |
| 마이클리닉 | MyClinic | MyClinic |
| 메디라운드 | Mediround | Mediround |
| 지니 (ChatGPT) | Genie | Genie |
| 테오 (Claude Code) | Theo | Theo |
| 케이론 | Chiron | Chiron（喀戎） |
| LEO / LEOLAB80 | LEO / LEOLAB80 | LEO / LEOLAB80 |
| 대표 | CEO / founder (문맥) | CEO / 创始人 (「代表」 단독은 본토에서 「대리인」으로 읽힘) |
| 고객 | customer(s) — 코디네이터 상담 맥락은 client(s) | 客户 |
| 의료진 | medical team | 医疗团队 |
| 시술 위키 · 시술정보 데이터베이스 | Procedure Wiki · procedure information database | 治疗项目维基 · 治疗项目信息数据库 |
| 쁘띠 시술 | minor cosmetic procedure | 微整形 |
| 사후관리 | aftercare | 后续管理 |
| 기술 수용 주기 · 초기시장 · 주류시장 | technology adoption life cycle · early market · mainstream market | 技术采用生命周期 · 早期市场 · 主流市场 |
| 완전완비제품 | the whole product | 完整产品（Whole Product） |
| 가치창출 · 가치확보 · 가치소모 활동 | value-creating · value-capturing · value-eroding activities | 价值创造 · 价值获取 · 价值侵蚀活动 |
| 쇼루밍 | showrooming | 展厅现象 |
| AI 에이전트 | AI agent | AI智能体 |
| 보건복지부 | Ministry of Health and Welfare | 保健福祉部 |

- 사람 이름: 제프리 무어 = Geoffrey Moore / 杰弗里·摩尔 · 탈레스 테이셰이라 = Thales S. Teixeira / 塔莱斯·特谢拉.
- 책: 『캐즘 마케팅』 = *Crossing the Chasm* / 《跨越鸿沟》 · 『디커플링』 = *Unlocking the Customer Value Chain* / 中文版名称 확인 후 사용(없으면 영문 원제).
- 새 용어가 나오면 이 표에 추가하고 두 언어에서 같은 말을 쓴다.
- 영어 표기: 글 제목 = 제목형(Title Case) · 소제목 = 문장형(Sentence case) · 책 제목 = 이탤릭.
- 그림 안 글자는 칸 폭이 정해져 있다 — 짧은 말을 고르고, 중국어는 줄바꿈 처리(CSS)가 따로 있다.

## 4. 번역본 상단 안내 — 없음(2026-10-27 삭제) · 대신 「핵심 요약」(keyPoints) = 한국어 글과 같은 순서·개수, 번역문의 해당 문장 그대로

- (2026-10-27 대표 지시로 번역본 상단 안내문 삭제 — 번역본도 한국어 글과 같은 모양. 아래 두 줄은 이력)
- English(삭제됨): *This post was translated from the Korean original with AI and reviewed before publishing.* · Read the original (Korean) →
- 中文(삭제됨): 本文由韩语原文经 AI 翻译，并在发布前经过审校。· 阅读韩语原文 →

## 5. 지니 → 테오 인계 (업로드에 필요한 것)

- `#ai_cowork` 에 한 글로: slug · 영어·중국어 번역문(원문 문단 순서와 1:1 — 제목·설명문 포함, 그림·표 안 글자도) · 언어별 Grammarly 검수 완료 표시와 날짜 · 대표 게시 승인.
- Grammarly 가 안 되는 언어가 있으면 그 사실을 적고 대표가 정한다 → 테오는 `grammarlySkipped` 에 사유를 적는다(검수한 것처럼 날짜를 적지 않는다).
- 테오는 받은 문장을 그대로 올린다. 올리다가 문장이 원문과 줄 수가 안 맞거나 그림 글자가 빠진 것처럼 「올릴 수 없는 문제」만 지니에게 되묻는다(문장 고치기 아님).

## 6. 검수 기록 (기존 8편, 10-14 오후 원칙 때)

- 역번역 대조: 테오가 번역본을 다시 한국어로 옮겨 원문과 뜻이 달라진 곳을 표로 남긴다 → Drive 글별 작업 폴더.
- 지니 검수표 · Grammarly 결과(반영/미반영과 이유)도 같은 폴더에 남긴다.

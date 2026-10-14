# 번역 검수 도구 (2026-10-14)

원칙 = 테오 1차 번역(역번역 대조) → 지니 검수 → Grammarly 검수 → 게시. 규칙·용어집 = `docs/translation-guide.md`.

- `node scripts/i18n/review-doc.mjs <repo> <slug> <out.html>` — 지니 검수본(원문·영어·중국어 세 칸 대조표). Drive `00_LEOLAB80/50_번역` 에 `rclone copyto … --drive-export-formats html --drive-import-formats html` 로 올리면 구글 문서가 된다
- `node scripts/i18n/ui-doc.mjs <repo> <out.html>` — 화면 문구·소개 페이지 대조표
- `node scripts/i18n/plain.mjs <repo> <en|zh> <slug> > x.txt` — Grammarly 에 올릴 평문(제목·설명·본문, 그림 글자 포함, 태그 제거)
- `node scripts/i18n/ui-plain.mjs <repo> <en|zh> <out.txt>` — 화면 문구 평문
- `python3 scripts/i18n/gapply.py <md> < 제안목록` — Grammarly 제안 중 반영할 것만 적용. 한 줄 = `[-지울 것-] {+넣을 것+}` 표기(앞뒤 … / ... 는 문맥). 못 찾은 줄은 MISS 로 출력 → 직접 고친다

Grammarly 메모: 영어 = 옛 편집기(app.grammarly.com 「Upload」), 중국어 = 새 편집기(「New doc」 → .txt 올리기 — 옛 편집기는 중국어를 검사하지 않는다). 새 편집기 결과 패널이 로딩에서 멈추면 패널 닫기 → 오른쪽 「Grammarly」 다시 열기.

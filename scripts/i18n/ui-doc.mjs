// 화면 문구·소개 페이지 대조표 HTML: node ui-doc.mjs <repo> <out.html>
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const [repo, out] = process.argv.slice(2);
const require = createRequire(path.resolve(repo, 'package.json'));
const esbuild = require('esbuild');
const tmp = path.join(path.dirname(out), '_i18n.bundle.mjs');
await esbuild.build({ entryPoints: [path.join(repo, 'src/i18n.ts')], bundle: true, format: 'esm', platform: 'node', outfile: tmp, logLevel: 'error' });
const { UI } = await import(tmp + '?t=' + Date.now());
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const rows = [];
const walk = (ko, en, zh, key) => {
	if (typeof ko === 'string') rows.push([key, ko, en, zh]);
	else if (Array.isArray(ko)) ko.forEach((v, i) => walk(v, en?.[i], zh?.[i], `${key}[${i + 1}]`));
	else for (const k of Object.keys(ko)) walk(ko[k], en?.[k], zh?.[k], key ? `${key}.${k}` : k);
};
walk(UI.ko, UI.en, UI.zh, '');
// 번역본 안내(notice)는 한국어 칸이 없다
for (const k of ['text', 'original', 'preview']) rows.push([`notice.${k}`, '(번역본에만 표시)', UI.en.notice[k], UI.zh.notice[k]]);
const body = rows.map((r, i) => `<tr><td>${i + 1}</td><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2] ?? '')}</td><td>${esc(r[3] ?? '')}</td></tr>`).join('\n');
fs.writeFileSync(out, `<html><head><meta charset="utf-8"><title>번역검수본_화면문구-소개페이지</title></head><body>
<h1>번역 검수본 — 사이트 화면 문구 · LEO 소개 페이지</h1>
<p>메뉴·버튼·안내문·카테고리 이름과 설명·LEO 소개 본문(about[1]~[9]). 검수 방법은 「번역검수_안내」와 같습니다.</p>
<table border="1" cellpadding="5" style="border-collapse:collapse;width:100%"><tr><th>#</th><th>위치</th><th>한국어</th><th>English</th><th>中文（简体）</th></tr>
${body}
</table>
<h2>지니 검수표</h2>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%"><tr><th>#</th><th>언어</th><th>지금 문장</th><th>고칠 문장</th><th>이유</th></tr><tr><td></td><td></td><td></td><td></td><td></td></tr></table>
</body></html>`);
fs.unlinkSync(tmp);
console.log('ui rows', rows.length);

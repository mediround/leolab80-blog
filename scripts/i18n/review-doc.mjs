// 지니 검수용 대조표 HTML 생성: 한국어 원문 | English | 中文 (문단 단위)
// 사용: node review-doc.mjs <repo> <slug> <out.html>
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const [repo, slug, out] = process.argv.slice(2);
const require = createRequire(path.join(repo, 'package.json'));
const { micromark } = require('micromark');
let gfm, gfmHtml;
try { ({ gfm, gfmHtml } = require('micromark-extension-gfm')); } catch {}
const read = (dir) => {
	const raw = fs.readFileSync(path.join(repo, 'src/content', dir, slug + '.md'), 'utf8');
	const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	const fm = Object.fromEntries(m[1].split('\n').map((l) => l.match(/^(\w+):\s*"?(.*?)"?$/)).filter(Boolean).map((x) => [x[1], x[2]]));
	const blocks = m[2].trim().split(/\n[ \t]*\n/).map((b) => b.trim()).filter(Boolean);
	return { fm, blocks };
};
const ko = read('blog'), en = read('blog-en'), zh = read('blog-zh');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const render = (b) => {
	if (/^<(figure|div|svg)/.test(b)) {
		// 그림: 태그를 빼고 글자만 (그림 모양은 미리보기 사이트에서 확인)
		const text = b.replace(/<figcaption>/g, '\n[캡션] ').replace(/<br\s*\/?>/g, ' / ').replace(/<[^>]+>/g, ' ').replace(/[ \t]+/g, ' ').trim();
		return '<p><i>[그림]</i> ' + esc(text) + '</p>';
	}
	const opts = { allowDangerousHtml: true, ...(gfm ? { extensions: [gfm()], htmlExtensions: [gfmHtml()] } : {}) };
	return micromark(b, opts);
};
const n = Math.max(ko.blocks.length, en.blocks.length, zh.blocks.length);
const mismatch = !(ko.blocks.length === en.blocks.length && en.blocks.length === zh.blocks.length);
let rows = '';
rows += `<tr><td><b>제목</b><br>${esc(ko.fm.title)}</td><td><b>Title</b><br>${esc(en.fm.title)}</td><td><b>标题</b><br>${esc(zh.fm.title)}</td><td></td></tr>`;
rows += `<tr><td><b>설명</b><br>${esc(ko.fm.description)}</td><td><b>Description</b><br>${esc(en.fm.description)}</td><td><b>描述</b><br>${esc(zh.fm.description)}</td><td></td></tr>`;
for (let i = 0; i < n; i++) {
	rows += `<tr><td>${ko.blocks[i] ? render(ko.blocks[i]) : ''}</td><td>${en.blocks[i] ? render(en.blocks[i]) : ''}</td><td>${zh.blocks[i] ? render(zh.blocks[i]) : ''}</td><td>${i + 1}</td></tr>`;
}
const html = `<html><head><meta charset="utf-8"><title>번역검수본_${slug}</title></head><body>
<h1>번역 검수본 — ${esc(ko.fm.title)}</h1>
<p>slug: <b>${slug}</b> · 한국어 원문 기준일 ${esc(ko.fm.updatedDate || ko.fm.pubDate)} · 테오 번역 + 역번역 대조 완료 2026-10-14</p>
<p>미리보기 화면(그림·표 모양 확인): 영어 /en/blog/${slug}/ · 중국어 /zh/blog/${slug}/ (주소는 인계 글 참고)</p>
${mismatch ? '<p><b>⚠ 문단 수가 언어마다 달라 줄이 어긋날 수 있습니다.</b></p>' : ''}
<h2>검수 방법</h2>
<ul>
<li>왼쪽 한국어 원문과 뜻이 같은지, 영어·중국어 문장이 그 언어로 자연스러운지 봅니다.</li>
<li>이 문서를 직접 고치지 말고, 아래 검수표 칸(또는 별도 검수표)에 <b>번호 · 언어 · 지금 문장 · 고칠 문장 · 이유</b>로 적어 주세요. 테오가 반영합니다.</li>
<li>용어집: docs/translation-guide.md (인계 글에 링크). 병원 이름 추가 금지 · 최상급·보장 표현 금지 · 원문에 없는 내용 추가 금지.</li>
</ul>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">
<tr><th style="width:31%">한국어 원문</th><th style="width:33%">English</th><th style="width:33%">中文（简体）</th><th>#</th></tr>
${rows}
</table>
<h2>지니 검수표</h2>
<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%"><tr><th>#</th><th>언어</th><th>지금 문장</th><th>고칠 문장</th><th>이유</th></tr><tr><td></td><td></td><td></td><td></td><td></td></tr></table>
</body></html>`;
fs.writeFileSync(out, html);
console.log(slug, 'blocks ko/en/zh', ko.blocks.length, en.blocks.length, zh.blocks.length, mismatch ? 'MISMATCH' : 'ok', gfm ? 'gfm' : 'no-gfm');

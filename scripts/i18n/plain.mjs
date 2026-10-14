// 번역 md → Grammarly 에 넣을 평문 (제목·설명·본문, 그림 글자 포함). node plain.mjs <repo> <lang> <slug>
import fs from 'node:fs'; import path from 'node:path'; import { createRequire } from 'node:module';
const [repo, lang, slug] = process.argv.slice(2);
const require = createRequire(path.join(repo, 'package.json'));
const { micromark } = require('micromark'); const { gfm, gfmHtml } = require('micromark-extension-gfm');
const raw = fs.readFileSync(path.join(repo, `src/content/blog-${lang}/${slug}.md`), 'utf8');
const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
const fm = Object.fromEntries(m[1].split('\n').map((l) => l.match(/^(\w+):\s*"?(.*?)"?$/)).filter(Boolean).map((x) => [x[1], x[2]]));
let h = micromark(m[2], { allowDangerousHtml: true, extensions: [gfm()], htmlExtensions: [gfmHtml()] });
h = h.replace(/(<\/[a-z0-9]+>)(<[a-z])/g, '$1\n$2'); // 그림 안 칸 글자가 붙지 않게
h = h.replace(/<(\/p|\/h\d|\/li|\/tr|br\s*\/?|\/figcaption|\/div|\/blockquote)>/g, '\n').replace(/<\/t[dh]>/g, ' | ').replace(/<[^>]+>/g, '');
h = h.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
h = h.replace(/<[^>]+>/g, ''); // 글자로 남은 태그(영상 iframe 등)도 지운다
const body = h.split('\n').map((l) => l.trim()).filter(Boolean).join('\n\n');
process.stdout.write(`${fm.title}\n\n${fm.description}\n\n${body}\n`);

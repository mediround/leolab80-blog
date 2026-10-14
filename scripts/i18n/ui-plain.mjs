import fs from 'node:fs'; import path from 'node:path'; import { createRequire } from 'node:module';
const [repo, lang, out] = process.argv.slice(2);
const require = createRequire(path.join(repo, 'package.json')); const esbuild = require('esbuild');
const tmp = path.resolve(path.dirname(out), '_ui.bundle.mjs');
await esbuild.build({ entryPoints: [path.join(repo, 'src/i18n.ts')], bundle: true, format: 'esm', platform: 'node', outfile: tmp, logLevel: 'error' });
const { UI } = await import('file://' + tmp + '?t=' + Date.now()); const lines = [];
const walk = (v) => { if (typeof v === 'string') lines.push(v); else if (Array.isArray(v)) v.forEach(walk); else Object.values(v).forEach(walk); };
walk(UI[lang]); fs.writeFileSync(out, lines.join('\n\n') + '\n'); fs.unlinkSync(tmp); console.log(lang, lines.length);

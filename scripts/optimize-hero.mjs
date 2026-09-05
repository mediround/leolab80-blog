// 대표이미지 최소 용량 축소 — SSOT §4.4 규격 (2026-09-05)
// 사용: node scripts/optimize-hero.mjs <원본 파일> <slug>
//  → src/assets/hero-<slug>.jpg 로 저장: 가로 1600px(16:9 중앙 crop) · JPG 품질 78 · mozjpeg · 메타데이터 제거 · 목표 ≤ 200KB
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const [, , src, slug] = process.argv;
if (!src || !slug) {
	console.error('사용법: node scripts/optimize-hero.mjs <원본 파일> <slug>');
	process.exit(64);
}
const out = path.resolve('src/assets', `hero-${slug}.jpg`);
const W = 1600;
const H = 900;
const TARGET = 200 * 1024;

const meta = await sharp(src).metadata();
let quality = 78;
let buf;
for (;;) {
	buf = await sharp(src)
		.rotate() // EXIF 방향 반영 후 메타 제거
		.resize(W, H, { fit: 'cover', position: 'centre', withoutEnlargement: false })
		.jpeg({ quality, mozjpeg: true, progressive: true })
		.toBuffer();
	if (buf.length <= TARGET || quality <= 60) break;
	quality -= 4;
}
fs.writeFileSync(out, buf);
console.log(
	`원본 ${meta.width}×${meta.height} ${(fs.statSync(src).size / 1024).toFixed(0)}KB → ${path.relative(process.cwd(), out)} ${W}×${H} ${(buf.length / 1024).toFixed(0)}KB (품질 ${quality})${buf.length > TARGET ? ' ⚠️ 200KB 초과 — 원본 재선택 검토' : ''}`,
);

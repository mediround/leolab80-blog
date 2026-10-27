# 핵심 요약(keyPoints) 대조·반영 — 사용: python3 -I scripts/key-points.py . <kp폴더> [--write]
# kp폴더/<slug>.json = {"slug","ko":[…],"en":[…],"zh":[…]} 의 문장이 그 언어 본문에 그대로 있는지 대조하고, --write 면 머리말에 넣는다.
import json, re, sys, os, glob
repo, kpdir = sys.argv[1], sys.argv[2]; write = '--write' in sys.argv
DIR = {'ko': 'blog', 'en': 'blog-en', 'zh': 'blog-zh'}
def plain(s):
    s = re.sub(r'\[([^\]]*)\]\([^)]*\)', r'\1', s)
    s = s.replace('*', '')  # 굵게·기울임
    s = s.replace(' (in Korean)', '').replace('（韩文）', '')  # 번역본 링크 언어 표기(요약 상자엔 링크가 없다)
    s = re.sub(r'<[^>]+>', ' ', s)
    return re.sub(r'\s+', ' ', s).strip()
bad = 0
for f in sorted(glob.glob(os.path.join(kpdir, '*.json'))):
    d = json.load(open(f, encoding='utf-8')); slug = d['slug']; counts = {}
    for lang, sub in DIR.items():
        pts = d.get(lang)
        p = os.path.join(repo, 'src/content', sub, slug + '.md')
        if pts is None or not os.path.exists(p):
            counts[lang] = None; continue
        txt = open(p, encoding='utf-8').read()
        m = re.match(r'^---\n(.*?)\n---\n', txt, re.S); fm, body = m.group(1), txt[m.end():]
        pb = plain(body)
        for i, pt in enumerate(pts):
            if plain(pt) not in pb:
                bad += 1; print(f'  ✗ {slug}/{lang}#{i+1} 본문에 없음: {pt[:60]}')
        counts[lang] = len(pts)
        if write:
            if 'keyPoints:' in fm: fm = re.sub(r'\nkeyPoints:\n(  - .*\n?)+', '\n', fm + '\n').rstrip('\n')
            fm = fm + '\nkeyPoints:\n' + '\n'.join('  - ' + json.dumps(pt, ensure_ascii=False) for pt in pts)
            open(p, 'w', encoding='utf-8').write('---\n' + fm + '\n---\n' + body)
    n = {v for v in counts.values() if v is not None}
    print(f'{slug}: {counts}' + ('' if len(n) <= 1 else '  ✗ 언어별 개수 다름'))
    if len(n) > 1: bad += 1
print('FAIL', bad) if bad else print('ALL PASS')
sys.exit(1 if bad else 0)

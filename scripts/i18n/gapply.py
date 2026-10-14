# Grammarly 제안(반영할 것만) → 파일에 적용. 사용: python3 gapply.py <md 파일> < 제안목록(한 줄 = Grammarly 본문 표기)
# 표기: [-지울 것-] {+넣을 것+} · 앞뒤 … 는 잘린 문맥
import sys,re
path=sys.argv[1]; s=open(path).read()
def norm_ap(x): return x.replace('’',"'")
ok=0; miss=[]
for line in sys.stdin:
    line=line.strip()
    if not line: continue
    body=line.strip().strip('…').strip('.').strip() if line.strip().startswith('...') or line.strip().endswith('...') else line.strip().strip('…').strip()
    if body.startswith('...'): body=body[3:]
    if body.endswith('...'): body=body[:-3]
    # Grammarly 가 넣는 [-˟-] 표시(공백 없음) 제거
    body=body.replace('[-˟-]','')
    old=re.sub(r'\{\+.*?\+\}','',body); old=re.sub(r'\[-(.*?)-\]',r'\1',old)
    new=re.sub(r'\[-.*?-\]','',body); new=re.sub(r'\{\+(.*?)\+\}',r'\1',new)
    old=re.sub(r'  +',' ',old).strip(); new=re.sub(r'  +',' ',new).strip()
    # 넣고 지운 자리 사이 빈칸 정리
    new=new.replace(' ,',',').replace(' .','.').replace(' ;',';').replace(' :',':')
    old=old.replace(' ,',',').replace(' .','.').replace(' ;',';').replace(' :',':')
    cand=[old, old.replace(' ,',','), norm_ap(old)]
    hit=None
    for c in cand:
        if c and s.count(c)==1: hit=c; break
        if c and norm_ap(s).count(c)==1:
            s=norm_ap(s); hit=c; break
    if hit: s=s.replace(hit,new); ok+=1
    else: miss.append((old,new))
open(path,'w').write(s)
print('applied',ok,'miss',len(miss))
for o,n in miss: print('MISS old:',o,'\n     new:',n)

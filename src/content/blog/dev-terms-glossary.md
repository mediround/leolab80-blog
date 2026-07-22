---
title: "바이브코딩하다 만난 말들 — 커밋, 브랜치, 머지, CI"
description: "코딩을 몰라도 코드를 만드는 시대. 그러다 만나는 커밋·브랜치·머지·CI 같은 낯선 말들을 뜻 그대로 정리했다. Git과 GitHub의 차이부터 자동 배포까지, 비개발자를 위한 최소한의 개발 용어 노트."
pubDate: "2026-07-22T21:00:00"
category: "메모"
heroImage: "../../assets/hero-dev-terms.jpg"
---

코딩을 배우지 않고도 코드를 만든다. 시키면 만들어 준다. 그런데 만드는 과정에서 낯선 말들이 지나간다. 커밋했습니다, 브랜치를 땄습니다, 머지하겠습니다, CI가 돌고 있습니다. 뜻을 모른 채 고개만 끄덕였다.

모르고 지나가도 결과물은 나온다. 하지만 무엇이 오가는지 모르면, 무언가 어긋났을 때 손을 쓸 수가 없다. 그래서 한 번 정리해 둔다. 개발자가 되기 위해서가 아니라, 내가 만드는 것이 어떻게 굴러가는지 알기 위해서.

## Git과 GitHub — 같은 말이 아니다

가장 먼저 헷갈리는 두 단어부터.

**Git(깃)** 은 파일이 바뀐 이력을 전부 기록해 두는 도구다. 언제 무엇을 어떻게 고쳤는지 남기고, 원하면 과거의 어느 시점으로든 되돌린다. 이 도구는 내 컴퓨터 안에서 돈다. 인터넷이 없어도 작동한다. 흔히 '버전 관리'라 부르는 일이 이것이다.

**GitHub(깃허브)** 는 그 기록을 인터넷에 올려 두는 창고다. 내 컴퓨터에만 있던 이력을 클라우드에 두어, 백업하고, 남과 함께 보고, 공개한다. Git이 원고를 고쳐 쓰는 방식이라면, GitHub는 그 원고를 올려 두는 서랍장이다. 도구는 Git 하나지만 창고는 여럿이라(GitLab, Bitbucket…), 그중 가장 큰 창고가 GitHub다.

**저장소(Repository, 레포)** 는 프로젝트 하나가 통째로 담기는 공간이다. 그 프로젝트의 모든 파일과, 지금까지 쌓인 모든 변경 이력이 이 안에 들어 있다. "레포를 팠다"는 말은 새 프로젝트 상자를 하나 열었다는 뜻이다.

<figure>
<svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="내 컴퓨터 안에서 도는 Git과 인터넷 창고인 GitHub의 관계. 둘 사이로 이력을 올리고 내려받는다">
<g font-family="'Noto Sans KR', sans-serif">
<rect x="36" y="54" width="192" height="118" fill="none" stroke="#000" stroke-width="1.6"/>
<text x="132" y="42" text-anchor="middle" font-size="11" fill="#555">내 컴퓨터</text>
<text x="132" y="96" text-anchor="middle" font-size="16" font-weight="700">Git</text>
<text x="132" y="118" text-anchor="middle" font-size="10.5" fill="#555">변경 이력을 기록하는 도구</text>
<line x1="88" y1="146" x2="176" y2="146" stroke="#000" stroke-width="1"/>
<circle cx="88" cy="146" r="4" fill="#000"/>
<circle cx="117" cy="146" r="4" fill="#000"/>
<circle cx="146" cy="146" r="4" fill="#000"/>
<circle cx="176" cy="146" r="4" fill="#000"/>
<rect x="332" y="54" width="192" height="118" fill="none" stroke="#000" stroke-width="1.6"/>
<text x="428" y="42" text-anchor="middle" font-size="11" fill="#555">인터넷</text>
<text x="428" y="96" text-anchor="middle" font-size="16" font-weight="700">GitHub</text>
<text x="428" y="118" text-anchor="middle" font-size="10.5" fill="#555">이력을 올려 두는 창고</text>
<text x="428" y="146" text-anchor="middle" font-size="10.5" fill="#555">백업 · 공유 · 협업</text>
<line x1="228" y1="98" x2="330" y2="98" stroke="#000" stroke-width="1.4"/><polygon points="330,98 321,94 321,102" fill="#000"/>
<text x="279" y="90" text-anchor="middle" font-size="10" fill="#555">올린다</text>
<line x1="330" y1="126" x2="228" y2="126" stroke="#000" stroke-width="1.4"/><polygon points="228,126 237,122 237,130" fill="#000"/>
<text x="279" y="140" text-anchor="middle" font-size="10" fill="#555">내려받는다</text>
</g>
</svg>
<figcaption>도구는 Git 하나, 창고는 GitHub.<br><b>둘은 같은 말이 아니다.</b></figcaption>
</figure>

## 기록하는 일 — 커밋

**커밋(Commit)** 은 지금까지 한 작업을 한 덩어리로 묶어 이력에 저장하는 것이다. 문서를 쓰다 '저장'을 누르는 것과 비슷하지만, 덮어쓰지 않는다는 점이 다르다. 커밋은 그 순간의 상태를 사진처럼 통째로 남긴다. 어제의 커밋도, 오늘의 커밋도 나란히 보존된다.

그래서 커밋마다 두 가지가 붙는다. 무엇을 왜 바꿨는지 적는 **커밋 메시지**, 그리고 그 커밋을 가리키는 고유한 이름표인 **해시**(`a1b2c3` 같은 문자열)다. 문제가 생기면 "이 커밋으로 되돌려" 하고 그 시점을 콕 집을 수 있다. 커밋이 촘촘할수록 되돌릴 지점이 많아진다. 자주 커밋하라는 말은 그래서 나온다.

<figure>
<svg viewBox="0 0 560 186" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="시간 순서대로 쌓이는 커밋들. 각 커밋은 그 순간의 상태를 사진처럼 남기고, 어느 시점으로든 되돌아갈 수 있다">
<g font-family="'Noto Sans KR', sans-serif">
<line x1="48" y1="108" x2="500" y2="108" stroke="#000" stroke-width="1.8"/>
<polygon points="508,108 496,103 496,113" fill="#000"/>
<text x="505" y="128" text-anchor="end" font-size="10.5" fill="#555">시간</text>
<circle cx="112" cy="108" r="6" fill="#000"/>
<line x1="112" y1="102" x2="112" y2="78" stroke="#555" stroke-width="0.9"/>
<text x="112" y="70" text-anchor="middle" font-size="11">처음 만듦</text>
<text x="112" y="136" text-anchor="middle" font-size="10" fill="#555">a1b2c3</text>
<circle cx="240" cy="108" r="6" fill="#000"/>
<line x1="240" y1="102" x2="240" y2="78" stroke="#555" stroke-width="0.9"/>
<text x="240" y="70" text-anchor="middle" font-size="11">기능 추가</text>
<text x="240" y="136" text-anchor="middle" font-size="10" fill="#555">4d5e6f</text>
<circle cx="368" cy="108" r="6" fill="#000"/>
<line x1="368" y1="102" x2="368" y2="78" stroke="#555" stroke-width="0.9"/>
<text x="368" y="70" text-anchor="middle" font-size="11">오타 수정</text>
<text x="368" y="136" text-anchor="middle" font-size="10" fill="#555">7a8b9c</text>
<circle cx="470" cy="108" r="7" fill="none" stroke="#000" stroke-width="2"/>
<line x1="470" y1="99" x2="470" y2="78" stroke="#555" stroke-width="0.9"/>
<text x="470" y="70" text-anchor="middle" font-size="11" font-weight="700">지금</text>
</g>
</svg>
<figcaption>커밋마다 메시지와 이름표(해시)가 붙는다.<br><b>덮어쓰지 않으니, 어느 시점으로든 되돌아간다.</b></figcaption>
</figure>

## 갈라지고 합치는 일 — 브랜치와 머지

**브랜치(Branch)** 는 본래의 줄기에서 갈라져 나온 작업 가지다. 잘 돌아가고 있는 원본은 그대로 두고, 옆에 사본을 하나 떠서 거기서 새 기능을 실험한다. 실험이 잘못돼도 원본은 멀쩡하다. 기본이 되는 줄기를 보통 **main(메인)** 이라 부르고, 거기서 가지를 치는 일을 "브랜치를 딴다"고 한다.

**머지(Merge)** 는 그 갈라진 가지를 다시 본류에 합치는 것이다. 사본에서 완성한 변경을 원본으로 가져와 하나로 만든다. 갈라짐(브랜치)과 합침(머지)은 한 쌍이다. 따로 실험하고, 되면 합친다.

**충돌(Conflict)** 은 합치다 부딪히는 지점이다. 같은 파일의 같은 줄을 두 갈래에서 서로 다르게 고쳤다면, 기계는 어느 쪽이 맞는지 모른다. 이때 자동 합치기가 멈추고 사람에게 묻는다. "둘 중 무엇을 남길까." 무섭게 들리지만, 그냥 사람이 골라 주면 되는 갈림길이다.

**풀 리퀘스트(Pull Request, PR)** 는 "내 가지의 변경을 본류에 합쳐 달라"는 정식 제안이다. 곧장 합치지 않고, 무엇을 바꿨는지 펼쳐 보이고 검토와 논의를 거친 뒤 머지한다. 혼자 작업할 때도 변경을 한눈에 훑는 창구가 된다. (창고에 따라 이름이 달라, GitLab에서는 같은 것을 '머지 리퀘스트'라 부른다.)

<figure>
<svg viewBox="0 0 560 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="본류 main에서 브랜치가 갈라져 나와 따로 커밋을 쌓은 뒤 다시 본류로 머지되는 흐름">
<g font-family="'Noto Sans KR', sans-serif">
<line x1="48" y1="70" x2="516" y2="70" stroke="#000" stroke-width="1.8"/>
<circle cx="96" cy="70" r="5" fill="#000"/>
<circle cx="176" cy="70" r="5" fill="#000"/>
<circle cx="392" cy="70" r="5" fill="#000"/>
<circle cx="480" cy="70" r="5" fill="#000"/>
<text x="48" y="56" font-size="11" font-weight="700">main (본류)</text>
<path d="M176,70 C210,70 214,150 248,150" fill="none" stroke="#000" stroke-width="1.6"/>
<line x1="248" y1="150" x2="336" y2="150" stroke="#000" stroke-width="1.6"/>
<path d="M336,150 C370,150 358,70 392,70" fill="none" stroke="#000" stroke-width="1.6"/>
<circle cx="280" cy="150" r="5" fill="none" stroke="#000" stroke-width="1.6"/>
<circle cx="330" cy="150" r="5" fill="none" stroke="#000" stroke-width="1.6"/>
<text x="248" y="178" font-size="11" fill="#555">브랜치 (갈라진 작업)</text>
<text x="176" y="42" text-anchor="middle" font-size="10.5" fill="#555">여기서 가지를 딴다</text>
<line x1="176" y1="46" x2="176" y2="62" stroke="#555" stroke-width="0.9"/>
<text x="392" y="42" text-anchor="middle" font-size="10.5" fill="#555">머지 (다시 합친다)</text>
<line x1="392" y1="46" x2="392" y2="62" stroke="#555" stroke-width="0.9"/>
<text x="96" y="96" text-anchor="middle" font-size="10" fill="#555">커밋</text>
</g>
</svg>
<figcaption>본류는 그대로 두고 옆에서 실험한다.<br><b>되면 합치고, 아니면 버린다.</b></figcaption>
</figure>

## 오가는 일 — 클론·푸시·풀

내 컴퓨터와 GitHub 창고 사이를 오가는 세 동작이 있다.

**클론(Clone)** 은 창고에 있는 저장소를 통째로 내 컴퓨터로 복제해 오는 것이다. 처음 한 번, 프로젝트를 손에 쥐는 동작이다.

**푸시(Push)** 는 내 컴퓨터에서 쌓은 커밋을 창고로 올려 보내는 것이다. 내가 한 작업이 이때 GitHub에 반영된다.

**풀(Pull)** 은 반대로, 창고의 최신 변경을 내 컴퓨터로 내려받아 합치는 것이다. 여럿이 함께 일할 때 남이 올린 것을 받아 오는 동작이다. 밀어 올리면 푸시, 당겨 내리면 풀. 방향만 반대다.

<figure>
<svg viewBox="0 0 560 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="내 컴퓨터와 GitHub 창고 사이를 오가는 세 동작. 처음 복제하는 클론, 올리는 푸시, 내려받는 풀">
<g font-family="'Noto Sans KR', sans-serif">
<rect x="34" y="52" width="170" height="108" fill="none" stroke="#000" stroke-width="1.6"/>
<text x="119" y="111" text-anchor="middle" font-size="13" font-weight="700">내 컴퓨터</text>
<rect x="356" y="52" width="170" height="108" fill="none" stroke="#000" stroke-width="1.6"/>
<text x="441" y="111" text-anchor="middle" font-size="13" font-weight="700">GitHub 창고</text>
<text x="280" y="70" text-anchor="middle" font-size="11"><tspan font-weight="700">푸시</tspan> — 올린다</text>
<line x1="204" y1="80" x2="354" y2="80" stroke="#000" stroke-width="1.4"/><polygon points="354,80 345,76 345,84" fill="#000"/>
<text x="280" y="108" text-anchor="middle" font-size="11"><tspan font-weight="700">풀</tspan> — 내려받는다</text>
<line x1="354" y1="118" x2="204" y2="118" stroke="#000" stroke-width="1.4"/><polygon points="204,118 213,114 213,122" fill="#000"/>
<text x="280" y="146" text-anchor="middle" font-size="11"><tspan font-weight="700">클론</tspan> — 처음 한 번, 통째로</text>
<line x1="354" y1="156" x2="204" y2="156" stroke="#000" stroke-width="1.4" stroke-dasharray="5 4"/><polygon points="204,156 213,152 213,160" fill="#000"/>
</g>
</svg>
<figcaption>내 컴퓨터와 창고 사이, 오가는 방향만 다르다.<br><b>올리면 푸시, 내리면 풀, 처음 복제는 클론.</b></figcaption>
</figure>

## 자동으로 흐르는 일 — CI와 CD

여기서부터가 처음엔 가장 낯설었다.

**CI(Continuous Integration, 지속적 통합)** 는 코드가 합쳐질 때마다 자동으로 검사를 돌리는 장치다. 커밋을 올리면 사람이 손대기 전에 기계가 먼저 "빌드가 되는지, 망가진 곳은 없는지"를 확인한다. 문제를 일찍, 작을 때 잡기 위해서다. "CI가 돌고 있다"는 말은 그 자동 검사가 진행 중이라는 뜻이고, "CI가 통과했다"는 이상 없이 끝났다는 뜻이다.

**CD(Continuous Delivery/Deployment, 지속적 배포)** 는 그 검사를 통과한 코드를 자동으로 실제 서비스에 반영하는 것이다. 사람이 서버에 일일이 올리지 않아도, 검사를 통과하면 곧바로 배포된다.

이 둘을 이어 붙인 자동 컨베이어벨트를 **CI/CD 파이프라인**이라 한다. 커밋 → 자동 검사(CI) → 자동 배포(CD)가 손 하나 안 대고 흐른다. GitHub 안에서 이 벨트를 돌리는 대표 도구가 **GitHub Actions**다.

사실 이 블로그가 그렇게 돌아간다. 글 하나를 커밋해 푸시하면, 검사가 돌고, 통과하면 몇 분 뒤 사이트에 알아서 반영된다. 나는 서버를 만진 적이 없다. 파이프라인이라는 벨트가 대신 옮겨 준다. 용어를 몰랐을 뿐, 이미 그 위에서 일하고 있었다.

<figure>
<svg viewBox="0 0 560 188" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="커밋에서 자동 검사 CI와 자동 배포 CD를 거쳐 사이트에 반영되는 CI/CD 파이프라인. 손대지 않아도 자동으로 흐른다">
<g font-family="'Noto Sans KR', sans-serif">
<text x="280" y="44" text-anchor="middle" font-size="10.5" fill="#555">손대지 않아도 자동으로 흐른다</text>
<rect x="22" y="66" width="108" height="54" fill="none" stroke="#000" stroke-width="1.6"/>
<text x="76" y="98" text-anchor="middle" font-size="12" font-weight="700">커밋·푸시</text>
<rect x="158" y="66" width="108" height="54" fill="none" stroke="#000" stroke-width="1.6"/>
<text x="212" y="93" text-anchor="middle" font-size="12" font-weight="700">자동 검사</text>
<text x="212" y="110" text-anchor="middle" font-size="10" fill="#555">CI</text>
<rect x="294" y="66" width="108" height="54" fill="none" stroke="#000" stroke-width="1.6"/>
<text x="348" y="93" text-anchor="middle" font-size="12" font-weight="700">자동 배포</text>
<text x="348" y="110" text-anchor="middle" font-size="10" fill="#555">CD</text>
<rect x="430" y="66" width="108" height="54" fill="none" stroke="#000" stroke-width="1.6"/>
<text x="484" y="98" text-anchor="middle" font-size="12" font-weight="700">사이트 반영</text>
<line x1="130" y1="93" x2="158" y2="93" stroke="#000" stroke-width="1.4"/><polygon points="158,93 149,89 149,97" fill="#000"/>
<line x1="266" y1="93" x2="294" y2="93" stroke="#000" stroke-width="1.4"/><polygon points="294,93 285,89 285,97" fill="#000"/>
<line x1="402" y1="93" x2="430" y2="93" stroke="#000" stroke-width="1.4"/><polygon points="430,93 421,89 421,97" fill="#000"/>
<text x="280" y="150" text-anchor="middle" font-size="10.5" fill="#555">GitHub Actions가 이 벨트를 돌린다</text>
</g>
</svg>
<figcaption>커밋하면 검사가 돌고, 통과하면 배포된다.<br><b>이 블로그가 바로 이렇게 굴러간다.</b></figcaption>
</figure>

## 남기는 메모

말을 알고 나니 지형이 보인다.

Git으로 기록하고(커밋), 갈라져 실험하고(브랜치), 되면 합치고(머지), 창고에 올리면(푸시) 벨트가 알아서 검사하고 배포한다(CI/CD). 낱말 하나하나는 이 흐름 위의 한 동작일 뿐이다.

몰라도 코드는 나온다. 그러나 흐름을 알면, 어긋난 자리에서 어디를 봐야 하는지 안다. 만드는 사람이 아니어도, 무엇을 만들고 있는지는 알아야 한다.

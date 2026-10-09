// LEO 소개 페이지 문의폼 → Resend 이메일 발송 (Vercel Serverless Function)
// 발신: no-reply@myclinic.io.kr (Resend 인증 도메인) → 수신: syj@mediround.co.kr (대표 지정 2026-10-09)
// 수신 주소는 화면·응답 어디에도 내보내지 않는다 — 방문자에게 주소를 노출하지 않는 것이 이 폼의 목적이다.
// 입력 칸 = 이메일·제목·내용 3개. 이름 칸·개인정보 안내 문구는 두지 않는다(대표 결정 2026-10-09).

// IP별 속도 제한 — 인스턴스 메모리 기반(베스트 에포트). 10분 창에 3회 초과 시 429.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;
const hits = new Map(); // ip -> [timestamps]

function rateLimited(ip) {
	const now = Date.now();
	const list = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
	if (list.length >= RATE_MAX) {
		hits.set(ip, list);
		return true;
	}
	list.push(now);
	hits.set(ip, list);
	if (hits.size > 5000) hits.clear(); // 메모리 폭주 방지
	return false;
}

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ ok: false, error: 'method' });
	}

	const ip = String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || 'unknown';
	if (rateLimited(ip)) {
		return res.status(429).json({ ok: false, error: 'rate' });
	}

	const { email, subject, message, website, ts } = req.body ?? {};

	// 허니팟(숨김 필드에 값이 있으면 봇) — 봇에게는 성공으로 위장하되 sent 플래그는 주지 않는다.
	if (website) return res.status(200).json({ ok: true });

	// 시간 함정: 페이지 로드 후 3초 이내 전송 = 봇으로 간주.
	const elapsed = Date.now() - Number(ts);
	if (!ts || !Number.isFinite(elapsed) || elapsed < 3000) {
		return res.status(200).json({ ok: true });
	}

	if (!email || !subject || !message) {
		return res.status(400).json({ ok: false, error: 'missing' });
	}
	if (
		String(email).length > 200 ||
		String(subject).length > 200 ||
		String(message).length > 5000 ||
		!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
	) {
		return res.status(400).json({ ok: false, error: 'invalid' });
	}

	const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

	const r = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from: 'LEOLAB80 블로그 <no-reply@myclinic.io.kr>',
			to: ['syj@mediround.co.kr'],
			reply_to: email,
			subject: `[블로그 문의] ${String(subject).replace(/[\r\n]+/g, ' ')}`,
			html: `<h2>mediseed.kr LEO 소개 페이지 문의</h2>
<p><strong>보낸 사람 이메일:</strong> ${esc(email)}</p>
<hr/>
<p style="white-space:pre-wrap">${esc(message)}</p>`,
		}),
	});

	if (!r.ok) {
		const detail = await r.text().catch(() => '');
		console.error('Resend error:', r.status, detail);
		return res.status(502).json({ ok: false, error: 'send' });
	}
	// sent:true = 메일이 실제로 발송된 경우에만. 프런트는 이 플래그로만 접수 완료를 표시하고 GA4 전환을 집계한다.
	return res.status(200).json({ ok: true, sent: true });
}

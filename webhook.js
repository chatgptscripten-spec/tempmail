// api/webhook.js
// Mailgun schickt eingehende Emails hierher
// In Mailgun unter "Receiving" → "Routes" einstellen

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

  // Mailgun schickt die Email als Formular-Daten
  const { sender, recipient, subject, 'body-plain': bodyPlain, 'body-html': bodyHtml } = req.body;

  console.log(`Email von ${sender} an ${recipient}: ${subject}`);

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(200).json({ ok: true });
  }

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/emails`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        from: sender,
        to: recipient,
        subject: subject || '(Kein Betreff)',
        body_plain: bodyPlain || '',
        body_html: bodyHtml || '',
        created_at: new Date().toISOString()
      })
    });
  } catch (e) {
    console.error('Supabase Fehler:', e);
  }

  res.status(200).json({ ok: true });
}

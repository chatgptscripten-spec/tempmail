// api/emails.js
// Gibt alle Emails für eine Adresse zurück
// Datenbank: Supabase (kostenlos)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { address } = req.query;
  if (!address) return res.status(400).json({ error: 'address fehlt' });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.json({ emails: [] });
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/emails?to=eq.${encodeURIComponent(address)}&order=created_at.desc&limit=50`,
      { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
    );
    const emails = await response.json();
    res.json({ emails: Array.isArray(emails) ? emails : [] });
  } catch {
    res.json({ emails: [] });
  }
}

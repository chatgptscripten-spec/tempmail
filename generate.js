// api/generate.js
// Generiert eine zufällige Email-Adresse
// Domain kommt aus der Umgebungsvariable MAIL_DOMAIN (in Vercel einstellen)

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const domain = process.env.MAIL_DOMAIN || 'tempmail.dev';
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const local = Array.from({length: 10}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  res.json({ email: `${local}@${domain}` });
}

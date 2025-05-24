export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const APPSCRIPT_URL = "https://script.google.com/macros/s/AKfycbx9AIF8Q7iWfPAvLLPxFeevxxqTB-TMRu0XoUj1oEg3OSWnbWawee0KPDQOKRiNieU_/exec";
      const body = req.body;
      const data = typeof body === "string" ? JSON.parse(body) : body;
      const r = await fetch(APPSCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      const result = await r.json();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: "Proxy error", details: err.message });
    }
  } else {
    res.status(405).end();
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const q = req.query.q || "Mundial 2026";

  try {
    const rssUrl =
      `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=es-419&gl=UY&ceid=UY:es-419`;

    const response = await fetch(rssUrl);
    const xml = await response.text();

    return res.status(200).send(xml);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}

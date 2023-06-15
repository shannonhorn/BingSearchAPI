export default async function handler(req, res) {
  const { query } = req.query;

  const response = await fetch(`https://api.bing.microsoft.com/v7.0/search?q=${query}`, {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.BING_SEARCH_API_KEY
    }
  });

  const data = await response.json();

  res.status(200).json(data);
}

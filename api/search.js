export default async function handler(req, res) {
    const query = req.query.q?.trim();

    if (!query) {
        return res.status(400).json({
            error: "Missing search query"
        });
    }

    try {
        const response = await fetch("https://api.tavily.com/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                api_key: process.env.TAVILY_API_KEY,
                query: query,
                max_results: 10
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Search failed"
        });
    }
}
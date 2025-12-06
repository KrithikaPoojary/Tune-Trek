const axios = require("axios");

// GET /api/music/search?q=love
exports.searchSongs = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      query
    )}&limit=20&media=music`;

    const response = await axios.get(url);
    const results = response.data.results || [];

    res.json(results);
  } catch (error) {
    console.error("Error searching songs:", error.message);
    res.status(500).json({ error: "Failed to fetch songs" });
  }
};

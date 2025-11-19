const axios = require("axios");

exports.searchSongs = async (req, res) => {
  const query = req.query.q;

  try {
    const response = await axios.get(
      "https://itunes.apple.com/search",
      {
        params: {
          term: query,
          entity: "song",
          limit: 25
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("iTunes API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch songs from iTunes API" });
  }
};

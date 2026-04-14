const axios = require("axios");

// GET /api/music/search?q=category
exports.searchSongs = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    let searchTerm = query.toLowerCase();

    // 🎯 Improved Category Mapping (IMPORTANT)
    if (searchTerm === "chill") {
      searchTerm = "lofi hindi chill";
    } 
    else if (searchTerm === "romantic") {
      searchTerm = "romantic bollywood songs";
    } 
    else if (searchTerm === "party") {
      searchTerm = "party hindi dance songs";
    } 
    else if (searchTerm === "workout") {
      searchTerm = "gym workout bollywood";
    } 
    else if (searchTerm === "sad") {
      searchTerm = "sad bollywood songs";
    } 
    else if (searchTerm === "happy") {
      searchTerm = "happy bollywood songs";
    } 
    else if (searchTerm === "study") {
      searchTerm = "study instrumental indian";
    } 
    else if (searchTerm === "sleep") {
      searchTerm = "relax sleep calm indian";
    }

    // 🌐 iTunes API
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      searchTerm
    )}&limit=25&media=music`;

    const response = await axios.get(url);

    // ✅ FILTER + REMOVE DUPLICATES + ONLY PLAYABLE SONGS
    const uniqueTitles = new Set();

    const apiSongs = (response.data.results || [])
      .filter(song => song.previewUrl) // only playable songs
      .filter(song => {
        if (uniqueTitles.has(song.trackName)) return false;
        uniqueTitles.add(song.trackName);
        return true;
      })
      .map((song) => ({
        id: song.trackId,
        title: song.trackName,
        artist: song.artistName,
        audio: song.previewUrl,
        image: song.artworkUrl100,
      }));

    // ❌ REMOVE FAKE MANUAL AUDIO (IMPORTANT FIX)
    // We DO NOT use SoundHelix anymore

    res.json(apiSongs);

  } catch (error) {
    console.error("Error fetching songs:", error.message);
    res.status(500).json({ error: "Failed to fetch songs" });
  }
};
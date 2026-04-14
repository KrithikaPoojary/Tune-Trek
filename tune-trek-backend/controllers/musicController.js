const axios = require("axios");

// GET /api/music/search?q=category
exports.searchSongs = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    let searchTerm = query.toLowerCase();

    // 🎯 Category Mapping
    if (searchTerm === "chill") {
      searchTerm = "lofi chill indian";
    } 
    else if (searchTerm === "romantic") {
      searchTerm = "romantic bollywood songs";
    } 
    else if (searchTerm === "party") {
      searchTerm = "party hindi dance songs";
    } 
    else if (searchTerm === "workout") {
      searchTerm = "bollywood workout songs";
    } 
    else if (searchTerm === "sad") {
      searchTerm = "sad bollywood songs";
    } 
    else if (searchTerm === "happy") {
      searchTerm = "happy bollywood songs";
    } 
    else if (searchTerm === "study") {
      searchTerm = "instrumental study indian";
    } 
    else if (searchTerm === "sleep") {
      searchTerm = "relax calm sleep indian";
    }

    // 🌐 API CALL
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      searchTerm
    )}&limit=50&media=music`;

    const response = await axios.get(url);

    const uniqueTitles = new Set();
    const imageCount = {};

    const apiSongs = (response.data.results || [])
      .filter(song => {
        if (!song.previewUrl || !song.trackName || !song.artistName) return false;

        const name = song.trackName.toLowerCase();
        const artist = song.artistName.toLowerCase();

        if (query !== "workout") {
          if (
            name.includes("workout") ||
            name.includes("fitness") ||
            name.includes("gym") ||
            name.includes("running")
          ) return false;
        }

        if (artist.includes("dj") || artist.includes("various")) return false;

        return true;
      })

      // ✅ Remove duplicate titles
      .filter(song => {
        if (uniqueTitles.has(song.trackName)) return false;
        uniqueTitles.add(song.trackName);
        return true;
      })

      .map(song => {
        let imageUrl = song.artworkUrl100
          ? song.artworkUrl100.replace("100x100", "500x500")
          : null;

        // 🔥 COUNT IMAGE REPEAT
        if (imageUrl) {
          imageCount[imageUrl] = (imageCount[imageUrl] || 0) + 1;

          // ❌ If same image used more than 2 times → replace
          if (imageCount[imageUrl] > 2) {
            imageUrl = `https://picsum.photos/300?random=${song.trackId}`;
          }
        } else {
          imageUrl = `https://picsum.photos/300?random=${song.trackId}`;
        }

        return {
          id: song.trackId,
          title: song.trackName,
          artist: song.artistName,
          audio: song.previewUrl,
          image: imageUrl
        };
      });

    res.json(apiSongs);

  } catch (error) {
    console.error("Error fetching songs:", error.message);
    res.status(500).json({ error: "Failed to fetch songs" });
  }
};
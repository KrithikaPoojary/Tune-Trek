const axios = require("axios");

// GET /api/music/search?q=category
exports.searchSongs = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    let searchTerm = query.toLowerCase();

    // 🎯 Category Mapping (balanced – not too strict)
    if (searchTerm === "chill") {
      searchTerm = "lofi chill hindi tamil";
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
      searchTerm = "sad hindi songs";
    } 
    else if (searchTerm === "happy") {
      searchTerm = "happy hindi songs";
    } 
    else if (searchTerm === "study") {
      searchTerm = "instrumental study music";
    } 
    else if (searchTerm === "sleep") {
      searchTerm = "relax calm music";
    }

    // 🌐 iTunes API
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      searchTerm
    )}&limit=50&media=music`;

    const response = await axios.get(url);

    const uniqueTitles = new Set();
    const imageCount = {};

    let apiSongs = (response.data.results || [])

      // ✅ Basic validation
      .filter(song => 
        song.previewUrl &&
        song.trackName &&
        song.artistName
      )

      // 🔥 Balanced filtering (NOT TOO STRICT)
      .filter(song => {
        const name = song.trackName.toLowerCase();
        const artist = song.artistName.toLowerCase();

        // ❌ remove only worst results
        if (
          name.includes("mix") ||
          name.includes("collection") ||
          name.includes("karaoke")
        ) return false;

        if (
          artist.includes("dj") ||
          artist.includes("various")
        ) return false;

        return true;
      })

      // ✅ Remove duplicate titles
      .filter(song => {
        if (uniqueTitles.has(song.trackName)) return false;
        uniqueTitles.add(song.trackName);
        return true;
      })

      // ✅ Format + fix images
      .map(song => {
        let imageUrl = song.artworkUrl100
          ? song.artworkUrl100.replace("100x100", "500x500")
          : null;

        // 🔥 Handle repeated images
        if (imageUrl) {
          imageCount[imageUrl] = (imageCount[imageUrl] || 0) + 1;

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

    // 🔥 FALLBACK (IMPORTANT – prevents empty screen)
    if (apiSongs.length === 0) {
      apiSongs = (response.data.results || []).slice(0, 10).map(song => ({
        id: song.trackId,
        title: song.trackName,
        artist: song.artistName,
        audio: song.previewUrl,
        image: song.artworkUrl100
          ? song.artworkUrl100.replace("100x100", "500x500")
          : `https://picsum.photos/300?random=${song.trackId}`
      }));
    }

    res.json(apiSongs);

  } catch (error) {
    console.error("Error fetching songs:", error.message);
    res.status(500).json({ error: "Failed to fetch songs" });
  }
};
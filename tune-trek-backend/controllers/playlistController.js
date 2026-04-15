const Playlist = require("../models/Playlist");

// CREATE PLAYLIST
exports.createPlaylist = async (req, res) => {
  try {
    const playlist = new Playlist({ name: req.body.name, songs: [] });
    await playlist.save();
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: "Failed to create playlist" });
  }
};

// ADD SONG
exports.addSongToPlaylist = async (req, res) => {
  const playlistId = req.params.id;
  const song = req.body.song;

  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    // ✅ NORMALIZE SONG FORMAT (VERY IMPORTANT)
    const newSong = {
      trackId: song.trackId || song.id,
      trackName: song.trackName || song.title,
      artistName: song.artistName || song.artist,
      artworkUrl100: song.artworkUrl100 || song.image,
      previewUrl: song.previewUrl || song.audio,
    };

    // ✅ PREVENT DUPLICATES
    const exists = playlist.songs.some(
      (s) => s.trackId === newSong.trackId
    );

    if (exists) {
      return res.status(400).json({ error: "Song already exists" });
    }

    playlist.songs.push(newSong);
    await playlist.save();

    res.json({ message: "Song added", playlist });

  } catch (error) {
    console.error("ADD SONG ERROR:", error);
    res.status(500).json({ error: "Failed to add song" });
  }
};

// REMOVE SONG
exports.removeSong = async (req, res) => {
  const playlistId = req.params.id;
  const { songId } = req.body;

  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    playlist.songs = playlist.songs.filter((s) => s.trackId !== songId);
    await playlist.save();

    res.json({ message: "Song removed", playlist });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove song" });
  }
};

// GET ALL PLAYLISTS
exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
};

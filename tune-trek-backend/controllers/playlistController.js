const Playlist = require("../models/Playlist");

// Create a new playlist
exports.createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;

    const newPlaylist = await Playlist.create({ name, songs: [] });

    res.json({ success: true, playlist: newPlaylist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add song to playlist
exports.addSong = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const song = req.body;

    const playlist = await Playlist.findById(playlistId);
    playlist.songs.push(song);

    await playlist.save();

    res.json({ success: true, playlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove song from playlist
exports.removeSong = async (req, res) => {
  try {
    const { playlistId, songId } = req.params;

    const playlist = await Playlist.findById(playlistId);

    playlist.songs = playlist.songs.filter((s) => s.id !== songId);

    await playlist.save();

    res.json({ success: true, playlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all playlists
exports.getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.json({ success: true, playlists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

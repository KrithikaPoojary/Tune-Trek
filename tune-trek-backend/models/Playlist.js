const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  trackId: Number,
  trackName: String,
  artistName: String,
  previewUrl: String,
  artworkUrl100: String
});

const playlistSchema = new mongoose.Schema({
  name: String,
  songs: [songSchema]
});

module.exports = mongoose.model("Playlist", playlistSchema);

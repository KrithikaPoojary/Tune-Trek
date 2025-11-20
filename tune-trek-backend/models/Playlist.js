const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  songs: [
    {
      id: String,
      title: String,
      artist: String,
      preview: String,
      albumCover: String,
    },
  ],
});

module.exports = mongoose.model("Playlist", PlaylistSchema);

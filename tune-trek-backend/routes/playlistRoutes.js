const express = require("express");
const router = express.Router();

const {
  createPlaylist,
  addSong,
  removeSong,
  getPlaylists,
} = require("../controllers/playlistController");

router.post("/playlist/create", createPlaylist);
router.post("/playlist/add/:playlistId", addSong);
router.delete("/playlist/remove/:playlistId/:songId", removeSong);
router.get("/playlists", getPlaylists);

module.exports = router;

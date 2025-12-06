const express = require("express");
const router = express.Router();
const {
  createPlaylist,
  addSongToPlaylist,
  removeSong,
  getPlaylists
} = require("../controllers/playlistController");

router.post("/", createPlaylist);
router.post("/:id/add", addSongToPlaylist);
router.delete("/:id/remove", removeSong);
router.get("/", getPlaylists);

module.exports = router;

const express = require("express");
const router = express.Router();
const { searchSongs } = require("../controllers/musicController");

// Route → http://localhost:5000/api/music/search?q=love
router.get("/search", searchSongs);

module.exports = router;

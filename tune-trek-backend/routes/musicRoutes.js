const express = require("express");
const { searchSongs } = require("../controllers/musicController");

const router = express.Router();

router.get("/search", searchSongs);

module.exports = router;

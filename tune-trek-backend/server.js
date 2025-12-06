require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// ROUTES
const musicRoutes = require("./routes/musicRoutes");
const playlistRoutes = require("./routes/playlistRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// --------------------
// CONNECT MONGODB
// --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// --------------------
// API ROUTES
// --------------------
app.use("/api/music", musicRoutes);      // 🎵 Search Songs
app.use("/api/playlist", playlistRoutes); // 🎼 Playlist CRUD

// --------------------
// START SERVER
// --------------------
app.listen(5000, () => {
  console.log("TuneTrek backend running on port 5000");
});

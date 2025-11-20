require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const musicRoutes = require("./routes/musicRoutes");
const playlistRoutes = require("./routes/playlistRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

// Routes
app.use("/api/music", musicRoutes);
app.use("/api/playlists", playlistRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("TuneTrek backend running on port 5000");
});

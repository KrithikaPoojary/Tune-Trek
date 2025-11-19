const express = require("express");
const cors = require("cors");
const musicRoutes = require("./routes/musicRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", musicRoutes);

app.listen(5000, () => {
  console.log("TuneTrek backend running on port 5000");
});

const express = require("express");
const db = require("./config/db");
const UserRoute = require("./routes/UserRoute");
const MovieRoute = require("./routes/MovieRoute");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("Welcome to the movie API");
});

app.use("/user", UserRoute);
app.use("/movie", MovieRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  db();
});

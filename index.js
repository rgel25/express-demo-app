const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const redditData = require("./data/data.json");

// SET VIEW ENGINE TO EJS
app.set("view engine", "ejs");
// SET VIEW PATH TO PATH RELATIVE TO INDEX.JS
app.set("views", path.join(__dirname, "/views"));
// SERVE STATIC ASSETS (BOOSTRAP CSS/JS)
app.use(express.static(path.join(__dirname, "public")));

// ROUTING
// HOMEPAGE
app.get("/", (req, res) => {
  res.render("home");
});
// SUBREDDIT
app.get("/r/:subreddit", (req, res) => {
  //   GET SUBREDDIT NAME FROM REQUEST PARAMETERS
  const { subreddit } = req.params;
  //   IF SUBREDDIT DOES NOT EXIST, RETURN A DEFAULT RES.SEND
  if (!redditData[subreddit]) return res.render("nosubreddit", { subreddit });
  //   IF SUBREDDIT EXISTS, RENDER THE SUBREDDIT VIEW PAGE AND PASS DATA
  //   DESTRUCTURE OBJECT
  res.render("subreddit", {
    ...redditData[subreddit],
  });
});

// CATCHALL
app.get("*", (req, res) => {
  //   res.send("<h1>ERROR 404: PAGE NOT FOUND | BLEHHHHHH</h1>");
  res.send("not found");
});

// INITIALIZE SERVER
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

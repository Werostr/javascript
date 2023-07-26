const express = require("express");
const app = express();

// app.use((req, res) => {
//   console.log("WE GOT A NEW REQUEST");
//   res.send("<h1>This is my webpage</h1>");
// });

app.get("/", (req, res) => {
  res.send("This is the home page");
});

app.post("/cats", (req, res) => {
  res.send("post request to /cats, this is different than get");
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`);
});

app.get("/", (req, res) => {
  res.send("This is the home page");
});

app.get("/search", (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.send("nothing found if nothing searched");
  }
  res.send(`Search result for: ${q}`);
});

app.get("*", (req, res) => {
  res.send("i dont know that path");
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});

// Index   /comments          GET     Display all comments
// NEW     /comments/new      GET     Form to create new comment
// Create  /comments          POST    Creates new comment on server
// Show    /comments/:id      GET     Details for one specific comment
// Edit    /comments/:id/edit GET     Form to edit specific comment
// Update  /comments/:id      PATCH   Updatees specific comment on server
// Destroy /comments/:id      DELETE  Deletes specific item on server

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv } = require("uuid");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
  {
    id: uuidv(),
    username: "Todd",
    comment: "lol that is so funny",
  },
  {
    id: uuidv(),
    username: "Skyler",
    comment: "i like to go birdwatching with my dog",
  },
  {
    id: uuidv(),
    username: "Sk8erBoi",
    comment: "Plz delete your account, Todd",
  },
  {
    id: uuidv(),
    username: "onlysayswoof",
    comment: "woof woof",
  },
];

// Index  /comments  GET  Display all comments
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

// NEW  /comments/new  GET  Form to create new comment
app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

// Create /comments  POST  Creates new comment on server
app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuidv() });
  res.redirect("/comments");
});

// Show  /comments/:id  GET  Details for one specific comment
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

// Editm /comments/:id/edit GET  Form to edit specific comment
app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render(`comments/edit`, { comment });
});

// Update /comments/:id  PATCH  Updatees specific comment on server
app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const foundComment = comments.find((c) => c.id === id);
  foundComment.comment = newCommentText;
  res.redirect("/comments");
});

// Destroy /comments/:id  DELETE  Deletes specific item on server
app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.get("/tacos", (req, res) => {
  res.send("GET /tacos response");
});

app.post("/tacos", (req, res) => {
  const { meat, qty } = req.body;
  res.send(`POST /tacos response, here are your ${qty} ${meat}`);
});

app.listen(3000, () => {
  console.log("ON PORT 3000");
});

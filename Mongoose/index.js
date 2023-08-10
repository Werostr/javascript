// npm init -y
// npm i mongoose
// node
// .load index.js

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/movieApp")
  .then(() => {
    console.log("CONNECTED");
  })
  .catch((err) => {
    console.log("ERROR");
    console.log(err);
  });

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model("Movie", movieSchema);

// need to be saved
const amadeus = new Movie({
  title: "Amadeus",
  year: 1986,
  score: 9.2,
  rating: "R",
});

// Movie.insertMany([
//   { title: "Amelie", year: 2001, score: 8.3, rating: "R" },
//   { title: "Alien", year: 1989, score: 6.3, rating: "R" },
//   { title: "The Iron Giant", year: 1989, score: 7.3, rating: "PG" },
//   { title: "Stand By Me", year: 2005, score: 2.3, rating: "R" },
//   { title: "Barbie", year: 2023, score: 9.3, rating: "PG-13" },
// ]).then((data) => {
//   console.log("OK");
//   console.log(data);
// });

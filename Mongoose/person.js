const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/shoppApp")
  .then(() => {
    console.log("CONNECTED");
  })
  .catch((err) => {
    console.log("ERROR");
    console.log(err);
  });

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

personSchema
  .virtual("fullName")
  .get(function () {
    return `${this.first} ${this.last}`;
  })
  .set(function (v) {
    this.first = v.substr(0, v.indexOf(" "));
    this.last = v.substr(v.indexOf(" ") + 1);
  });

personSchema.pre("save", async function () {
  console.log("ABOUT OT SAVE");
});

personSchema.post("save", async function () {
  console.log("JUST SAVED");
});

const Person = mongoose.model("Person", personSchema);

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

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
  size: {
    type: String,
    enum: ["S", "M", "L"],
  },
});

// instance method
productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
};

productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat);
  return this.save();
};

// static methods
productSchema.statics.fireSale = function () {
  return this.updateMany({ onSale: true, price: 0 });
};

const Product = mongoose.model("Product", productSchema);

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "Bike Helmet" });
  console.log(foundProduct);
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
  await foundProduct.addCategory("Outdoors");
  console.log(foundProduct);
};

// const bike = new Product({
//   name: "Bike Helmet",
//   price: 29,
//   categories: ["Cycling", "Safety"],
// });

// bike
//   .save()
//   .then((data) => {
//     console.log("IT WORKED");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("OH NO");
//     console.log(err.errors.name);
//   });

// Product.findOneAndUpdate(
//   { name: "Bike Helmet" },
//   { price: -20 },
//   { new: true, runValidators: true }
// )
//   .then((data) => {
//     console.log("IT WORKED");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("ERROR");
//     console.log(err);
//   });

// findProduct();
Product.fireSale().then((res) => console.log(res));

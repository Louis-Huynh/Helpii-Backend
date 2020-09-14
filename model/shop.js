const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shopSchema = new Schema({
  name: { type: String, require: true },
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;

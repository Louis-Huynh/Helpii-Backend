const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: { type: String, require: true },
});

const Services = mongoose.model("Services", serviceSchema);

module.exports = Services;

const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  username: String,
  title: String,
  description: String,
  date: Date,
});

serviceSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Services", serviceSchema);

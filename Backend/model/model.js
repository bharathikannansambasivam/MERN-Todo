const mongoose = require("mongoose");

const todoScheme = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});
const todoModel = mongoose.model("todoModel", todoScheme);
module.exports = { todoModel };

const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Category", categoriesSchema);

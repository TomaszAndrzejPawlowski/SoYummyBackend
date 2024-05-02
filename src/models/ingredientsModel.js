const mongoose = require("mongoose");

const ingredientsSchema = new mongoose.Schema(
  {
    ttl: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    t: {
      type: String,
      required: true,
    },
    thb: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Ingredient", ingredientsSchema);

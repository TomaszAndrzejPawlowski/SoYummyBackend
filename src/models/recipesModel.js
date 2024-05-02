const mongoose = require("mongoose");

const recipesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    area: {
      type: String,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
    },
    preview: {
      type: String,
    },
    time: {
      type: String,
      required: true,
    },
    favorites: [String],
    youtube: {
      type: String,
    },
    tags: [String],
    ingredients: {
      type: Array,
      default: {
        id: "test",
        measure: "1 ts",
      },
    },
    creator: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipesSchema);

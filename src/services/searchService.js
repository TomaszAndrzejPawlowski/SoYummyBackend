const Recipe = require("../models/recipesModel");

const searchByTitle = async (userInput) => {
  try {
    const filteredRecipes = await Recipe.find({
      title: { $regex: userInput, $options: "i" },
      });
    console.log(filteredRecipes)
    return filteredRecipes;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { searchByTitle };

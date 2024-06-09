const Recipe = require("../models/recipesModel");

const getPopularRecipes = async () => {
  try {
    const allRecipes = await Recipe.find();
    allRecipes.sort((a, b) => b.favorites.length - a.favorites.length);
    const firstEightRecipes = allRecipes.slice(0, 4);
    return firstEightRecipes;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { getPopularRecipes };

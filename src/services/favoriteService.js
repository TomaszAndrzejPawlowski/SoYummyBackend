const User = require("../models/userModel");
const Recipe = require("../models/recipesModel");

const addToFav = async (recipeId, userId, userFavs) => {
  try {
    const isRecipeInFavs = userFavs.some((recipe) => recipe === recipeId);
    if (isRecipeInFavs) {
      return 400;
    }
    const foundRecipe = await Recipe.findOne({ _id: recipeId });
    if (!foundRecipe) {
      return 404;
    }
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { favRecipes: recipeId } }
    );
    await Recipe.findOneAndUpdate(
      { _id: recipeId },
      { $push: { favorites: userId } }
    );
  } catch (err) {
    console.log(err.message);
  }
};

const getUserFav = async (userFavs) => {
  try {
    const favRecipes = Recipe.find({ _id: { $in: userFavs } });
    return favRecipes;
  } catch (err) {
    console.log(err.message);
  }
};

const removeFromFav = async (recipeId, userId, userFavs) => {
  try {
    const isRecipeInFavs = userFavs.some((recipe) => recipe === recipeId);
    if (!isRecipeInFavs) {
      return 400;
    }
    const foundRecipe = await Recipe.findOne({ _id: recipeId });
    if (!foundRecipe) {
      return 404;
    }
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { favRecipes: recipeId } }
    );
    await Recipe.findOneAndUpdate(
      { _id: recipeId },
      { $pull: { favorites: userId } }
    );
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { addToFav, getUserFav, removeFromFav };

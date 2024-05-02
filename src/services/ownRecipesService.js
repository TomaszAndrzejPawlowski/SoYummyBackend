const User = require("../models/userModel");
const Recipe = require("../models/recipesModel");

const addOwnRecipe = async (userRecipe, userId) => {
  try {
    const checkRecipes = await Recipe.find({ title: userRecipe.title });
    if (checkRecipes.length > 0) {
      return { status: 409, message: "Recipe of that title already exists" };
    }
    const newRecipe = new Recipe({
      ...userRecipe,
      creator: userId,
    });
    await newRecipe.save();
    const addedRecipe = await Recipe.findOne({ title: userRecipe.title });
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { addedRecipes: addedRecipe.id } }
    );
    return addedRecipe;
  } catch (err) {
    console.log(err.message);
  }
};

const deleteOwnRecipe = async (recipeId, userId, addedRecipesByUser) => {
  try {
    const recipeToDeletion = await Recipe.findOne({ _id: recipeId });
    if (!recipeToDeletion) {
      return 400;
    }
    const userCreatedRecipe = addedRecipesByUser.some(
      (recipe) => recipe === recipeId
    );
    if (userCreatedRecipe) {
      await Recipe.deleteOne({ _id: recipeId });
      await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { addedRecipes: recipeId } }
      );
    } else {
      return 401;
    }
  } catch (err) {
    console.log(err.message);
  }
};
const getOwnRecipes = async (addedRecipesByUser) => {
  try {
    const recipesOwnedByUser = await Recipe.find({
      _id: { $in: addedRecipesByUser },
    });
    return recipesOwnedByUser;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { addOwnRecipe, deleteOwnRecipe, getOwnRecipes };

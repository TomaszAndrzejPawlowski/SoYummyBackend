const Category = require("../models/categoriesModel");
const Recipe = require("../models/recipesModel");

const getCategoryList = async () => {
  try {
    const categories = await Category.find();
    const sortedCategories = categories.sort((firstCategory, secondCategory) =>
      firstCategory.title.localeCompare(secondCategory.title)
    );
    return sortedCategories;
  } catch (err) {
    console.log(err.message);
  }
};
const getRecipesForMainPage = async () => {
  try {
    const recipes = await Recipe.find();
    const recipesForMainPage = recipes.filter(
      (recipe) =>
        recipe.category === "Breakfast" ||
        recipe.category === "Miscellaneous" ||
        recipe.category === "Chicken" ||
        recipe.category === "Dessert"
    );
    return recipesForMainPage;
  } catch (err) {
    console.log(err.message);
  }
};
const getRecipesForCategory = async (category) => {
  try {
    const recipes = await Recipe.find();
    const recipesByCategory = recipes.filter(
      (recipe) => recipe.category === category
    );
    return recipesByCategory;
  } catch (err) {
    console.log(err.message);
  }
};
const getRecipeById = async (recipeId) => {
  try {
    const recipe = await Recipe.findOne({ _id: recipeId });
    return recipe;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getCategoryList,
  getRecipesForMainPage,
  getRecipesForCategory,
  getRecipeById,
};

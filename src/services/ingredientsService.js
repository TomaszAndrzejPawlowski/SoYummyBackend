const Recipe = require("../models/recipesModel");
const Ingredient = require("../models/ingredientsModel");

const getIngredientsList = async () => {
  try {
    const ingredientsList = await Ingredient.find();
    return ingredientsList;
  } catch (err) {
    console.log(err.message);
  }
};
const getRecipesByIngredients = async (userInput) => {
  try {
    const ingredientFromInput = await Ingredient.findOne({
      ttl: { $regex: userInput, $options: "i" },
    });
    const recipesList = await Recipe.find();
    const recipesWithIngredient = recipesList.filter((recipe) =>
      recipe.ingredients.some((ingredient) => ingredient.id.toString() === ingredientFromInput._id.toString())
        );
    return recipesWithIngredient;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { getIngredientsList, getRecipesByIngredients };

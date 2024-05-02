const { okResponse } = require("../middlewares/commonResponsesMiddleware");
const popularRecipesService = require("../services/popularRecipeService");

const getPopularRecipes = async (req, res, next) => {
  try {
    const result = await popularRecipesService.getPopularRecipes();
    return okResponse(res, result);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = { getPopularRecipes };

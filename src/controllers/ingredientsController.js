const {
  okResponse,
  notFoundResponse,
} = require("../middlewares/commonResponsesMiddleware");
const ingredientsService = require("../services/ingredientsService");

const getIngredientsList = async (req, res, next) => {
  try {
    const result = await ingredientsService.getIngredientsList();
    if (result) {
      return okResponse(res, result);
    }
    return notFoundResponse(res, "Not found");
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const getRecipesByIngredients = async (req, res, next) => {
  try {
    const result = await ingredientsService.getRecipesByIngredients(
      req.query.ingredient
      );
    console.log(result)
    if (result) {
      return okResponse(res, result);
    }
    return notFoundResponse(res, "Not found");
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = { getIngredientsList, getRecipesByIngredients };

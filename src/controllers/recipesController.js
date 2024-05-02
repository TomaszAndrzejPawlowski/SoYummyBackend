const { okResponse } = require("../middlewares/commonResponsesMiddleware");
const recipesService = require("../services/recipesService");

const getCategoryList = async (req, res, next) => {
  try {
    const result = await recipesService.getCategoryList();
    if (result) {
      return okResponse(res, result);
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
const getRecipesForMainPage = async (req, res, next) => {
  try {
    const result = await recipesService.getRecipesForMainPage();
    if (result) {
      return okResponse(res, result);
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
const getRecipesForCategory = async (req, res, next) => {
  try {
    const result = await recipesService.getRecipesForCategory(
      req.params.category
    );
    if (result) {
      return okResponse(res, result);
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
const getRecipeById = async (req, res, next) => {
  try {
    const result = await recipesService.getRecipeById(req.params.id);
    if (result) {
      return okResponse(res, result);
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = {
  getCategoryList,
  getRecipesForMainPage,
  getRecipesForCategory,
  getRecipeById,
};

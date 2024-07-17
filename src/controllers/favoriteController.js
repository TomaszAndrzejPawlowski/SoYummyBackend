const {
  badRequestResponse,
  notFoundResponse,
  okResponse,
} = require("../middlewares/commonResponsesMiddleware");
const favoriteService = require("../services/favoriteService");

const addToFav = async (req, res, next) => {
  try {
    const result = await favoriteService.addToFav(
      req.body.id,
      req.user.id,
      req.user.favRecipes
    );
    if (result === 400) {
      return badRequestResponse(res, "Recipe already added to favorites");
    }
    if (result === 404) {
      return notFoundResponse(res, "No recipe found by provided id");
    }
    return okResponse(res, {message: "Recipe added to favorites", id: req.body.id});
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const getUserFav = async (req, res, next) => {
  try {
    const result = await favoriteService.getUserFav(req.user.favRecipes);
    if (result.length) {
      return okResponse(res, result);
    }
    return notFoundResponse(res, "User favorites are empty");
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const removeFromFav = async (req, res, next) => {
  try {
    const result = await favoriteService.removeFromFav(
      req.body.id,
      req.user.id,
      req.user.favRecipes
    );
    if (result === 400) {
      return badRequestResponse(res, "Recipe is not in favorites");
    }
    if (result === 404) {
      return notFoundResponse(res, "No recipe found by provided id");
    }
    return okResponse(res, {message: "Recipe removed from favorites", id: req.body.id});
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = { addToFav, getUserFav, removeFromFav };

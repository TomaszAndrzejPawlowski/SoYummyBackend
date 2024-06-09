const {
  notFoundResponse,
  okResponse,
} = require("../middlewares/commonResponsesMiddleware");
const shoppingListService = require("../services/shoppingListService");

const addToShoppingList = async (req, res, next) => {
  try {
    const result = await shoppingListService.addToShoppingList(
      req.body,
      req.user.id
    );
    if (result === 404) {
      return notFoundResponse(res, "No ingredient found by provided id");
    }
    return okResponse(res, {message: "Added to shopping list", ingredient: req.body});
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
const removeFromShoppingList = async (req, res, next) => {
  try {
    const result = await shoppingListService.removeFromShoppingList(
      req.body,
      req.user.id,
      req.user.shoppingList
    );
    if (result === 404) {
      return notFoundResponse(res, "No ingredients with provided data found");
    }
    return okResponse(res, {message: "Removed from shopping list", ingredient: req.body});
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
const getUserShoppingList = async (req, res, next) => {
  try {
    const result = await shoppingListService.getUserShoppingList(
      req.user.shoppingList
    );
    // console.log(result);
    if (result === 404) {
      return notFoundResponse(
        res,
        "No ingredients added to user shopping list"
      );
    }
    return okResponse(res, result);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = {
  addToShoppingList,
  removeFromShoppingList,
  getUserShoppingList,
};

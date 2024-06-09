const User = require("../models/userModel");
const Ingredient = require("../models/ingredientsModel");

const addToShoppingList = async (userInput, userId) => {
  try {
    const ingredient = Ingredient.findOne({ _id: userInput.id });
    if (!ingredient) {
      return 404;
    }
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { shoppingList: userInput } }
    );
  } catch (err) {
    console.log(err.message);
  }
};
const removeFromShoppingList = async (userInput, userId, userShoppingList) => {
  try {
    const insideShoppingList = userShoppingList.some(
      (ingredient) =>
        ingredient._id === userInput.id &&
        ingredient.measure === userInput.measure
    );
    if (!insideShoppingList) {
      return 404;
    }
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: {
          shoppingList: { _id: userInput.id, measure: userInput.measure },
        },
      }
    );
  } catch (err) {
    console.log(err.message);
  }
};
const getUserShoppingList = async (userShoppingList) => {
  try {
    if (!userShoppingList.length) {
      return 404;
    }
    return userShoppingList;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  addToShoppingList,
  removeFromShoppingList,
  getUserShoppingList,
};

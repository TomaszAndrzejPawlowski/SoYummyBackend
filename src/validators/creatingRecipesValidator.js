const Joi = require("joi");

const ingredientInRecipeSchema = Joi.object({
  id: Joi.string().required(),
  measure: Joi.string().required(),
});

const ownRecipeSchema = Joi.object({
  image: Joi.binary(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string()
    .valid(
      "Beef",
      "Breakfast",
      "Chicken",
      "Dessert",
      "Goat",
      "Lamb",
      "Miscellaneous",
      "Pasta",
      "Pork",
      "Seafood",
      "Side",
      "Starter",
      "Vegan",
      "Vegetarian"
    )
    .required(),
  time: Joi.string().required(),
  ingredients: Joi.array().items(ingredientInRecipeSchema).required(),
  instructions: Joi.string().required(),
  area: Joi.string(),
  youtube: Joi.string(),
  tags: Joi.array().items(Joi.string),
});

const validateCreatingRecipe = (userData) => {
  return ownRecipeSchema.validateAsync(userData, { abortEarly: false });
};

module.exports = { validateCreatingRecipe };

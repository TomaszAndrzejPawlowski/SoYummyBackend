const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  getIngredientsList,
  getRecipesByIngredients,
} = require("../controllers/ingredientsController");

router.get("/list", authMiddleware, getIngredientsList);
router.get("/", authMiddleware, getRecipesByIngredients);

module.exports = router;

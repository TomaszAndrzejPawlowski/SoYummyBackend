const express = require("express");
const {
  getCategoryList,
  getRecipesForMainPage,
  getRecipesForCategory,
  getRecipeById,
} = require("../controllers/recipesController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/category-list", authMiddleware, getCategoryList);
router.get("/main-page", authMiddleware, getRecipesForMainPage);
router.get("/:category", authMiddleware, getRecipesForCategory);
router.get("/id/:id", authMiddleware, getRecipeById);

module.exports = router;

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const { getPopularRecipes } = require("../controllers/popularRecipeController");

router.get("/", authMiddleware, getPopularRecipes);

module.exports = router;

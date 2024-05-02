const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  addOwnRecipe,
  deleteOwnRecipe,
  getOwnRecipes,
} = require("../controllers/ownRecipesController");
const upload = require("../middlewares/multerMiddleware");
const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), addOwnRecipe);
router.delete("/", authMiddleware, deleteOwnRecipe);
router.get("/", authMiddleware, getOwnRecipes);

module.exports = router;

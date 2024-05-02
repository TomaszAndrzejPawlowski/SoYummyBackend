const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  addToShoppingList,
  removeFromShoppingList,
  getUserShoppingList,
} = require("../controllers/shoppingListController");

router.patch("/", authMiddleware, addToShoppingList);
router.patch("/remove", authMiddleware, removeFromShoppingList);
router.get("/", authMiddleware, getUserShoppingList);

module.exports = router;

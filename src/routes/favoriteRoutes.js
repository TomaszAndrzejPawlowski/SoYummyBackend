const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  addToFav,
  getUserFav,
  removeFromFav,
} = require("../controllers/favoriteController");

router.patch("/", authMiddleware, addToFav);
router.get("/", authMiddleware, getUserFav);
router.patch("/remove", authMiddleware, removeFromFav);

module.exports = router;

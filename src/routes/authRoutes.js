const express = require("express");
const {
  register,
  login,
  logout,
  getUser,
  editUser,
} = require("../controllers/authController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", authMiddleware, logout);
router.get("/info", authMiddleware, getUser);
router.patch("/edit", authMiddleware, upload.single("image"), editUser);

module.exports = router;

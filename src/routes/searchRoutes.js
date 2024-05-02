const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { searchByTitle } = require("../controllers/searchController");
const router = express.Router();

router.get("/", authMiddleware, searchByTitle);

module.exports = router;

const express = require("express");
const { sendNewsletter } = require("../controllers/subscribeController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, sendNewsletter);

module.exports = router;

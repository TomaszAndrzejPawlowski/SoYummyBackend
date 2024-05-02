const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { unauthorizedResponse } = require("./commonResponsesMiddleware");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return unauthorizedResponse(res, "Not authorized");
  }
  if (bearerToken) {
    const token = bearerToken.split(" ")[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ _id: payload.id });
      if (user.token !== token) {
        return unauthorizedResponse(res, "Not authorized");
      } else {
        req.user = user;
        next();
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        status: "failure",
        code: 500,
        message: err.message,
      });
    }
  }
};

module.exports = authMiddleware;

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
require("dotenv").config();
const authRouter = require("./src/routes/authRoutes");
const subscribeRouter = require("./src/routes/subscribeRoutes");
const recipesRouter = require("./src/routes/recipesRoutes");
const searchRouter = require("./src/routes/searchRoutes");
const ingredientsRouter = require("./src/routes/ingredientsRoutes");
const ownRecipesRouter = require("./src/routes/ownRecipesRoutes");
const favoriteRouter = require("./src/routes/favoriteRoutes");
const popularRecipeRouter = require("./src/routes/popularRecipeRoutes");
const shoppingListRouter = require("./src/routes/shoppingListRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/api/auth", authRouter);
app.use("/api/subscribe", subscribeRouter);
app.use("/api/recipes", recipesRouter);
app.use("/api/search", searchRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/ownRecipes", ownRecipesRouter);
app.use("/api/favorite", favoriteRouter);
app.use("/api/popular-recipe", popularRecipeRouter);
app.use("/api/shopping-list", shoppingListRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
  });
});

const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  dbName: "SoYummy",
});

module.exports = { app, connection };

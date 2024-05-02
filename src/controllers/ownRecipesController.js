const {
  badReqResponse,
} = require("../../../goit-nodejs-hw-02/routes/controllers/common");
const {
  dataCreatedResponse,
  dataConflictResponse,
  okResponse,
  unauthorizedResponse,
  notFoundResponse,
  badRequestResponse,
} = require("../middlewares/commonResponsesMiddleware");
const ownRecipesService = require("../services/ownRecipesService");
const cloudinary = require("../utils/cloudinary");
const {
  validateCreatingRecipe,
} = require("../validators/creatingRecipesValidator");

const addOwnRecipe = async (req, res, next) => {
  try {
    await validateCreatingRecipe(req.body);
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "SoYummy/Recipe",
        width: 300,
        crop: "scale",
        radius: 10,
        quality: "auto:eco",
        fetch_format: "auto",
      });
      req.body.preview = uploadResult.secure_url;
      const result = await ownRecipesService.addOwnRecipe(
        req.body,
        req.user.id
      );
      if (result && result.status !== 409) {
        return dataCreatedResponse(res, result);
      }
      if (result && result.status === 409) {
        return dataConflictResponse(res, result.message);
      }
      return badRequestResponse(res, "Wrong input");
    }
    const result = await ownRecipesService.addOwnRecipe(req.body, req.user.id);
    if (result && result.status !== 409) {
      return okResponse(res, result);
    }
    if (result && result.status === 409) {
      return dataConflictResponse(res, result.message);
    }
    return badReqResponse(res, "Wrong input");
  } catch (err) {
    if (err.isJoi === true) {
      const message =
        "Bad request, validation errors: " +
        err.details.map((detail) => detail.message).join(", ");
      return badRequestResponse(res, message);
    }
    console.log(err.message);
    next(err);
  }
};

const deleteOwnRecipe = async (req, res, next) => {
  try {
    const result = await ownRecipesService.deleteOwnRecipe(
      req.body.id,
      req.user.id,
      req.user.addedRecipes
    );
    if (result === 400) {
      return badReqResponse(res, "No recipe found with provided id.");
    }
    if (result === 401) {
      return unauthorizedResponse(
        res,
        "User is not a creator of provided recipe"
      );
    }
    return okResponse(res, "Recipe deleted");
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};
const getOwnRecipes = async (req, res, next) => {
  try {
    const result = await ownRecipesService.getOwnRecipes(req.user.addedRecipes);
    if (result.length) {
      return okResponse(res, result);
    }
    return notFoundResponse(res, "No recipes created by user found.");
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = { addOwnRecipe, deleteOwnRecipe, getOwnRecipes };

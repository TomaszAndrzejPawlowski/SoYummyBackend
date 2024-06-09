const authService = require("../services/authService");
const {
  validateRegister,
  validateLogin,
  validateEditUser,
} = require("../validators/userValidator");
const cloudinary = require("../utils/cloudinary");
const {
  okResponse,
  dataCreatedResponse,
  badRequestResponse,
  unauthorizedResponse,
  dataConflictResponse,
} = require("../middlewares/commonResponsesMiddleware");

const register = async (req, res, next) => {
  try {
    await validateRegister(req.body);
    const result = await authService.register(req.body);
    if (result !== 409) {
      return dataCreatedResponse(res, result);
    }
    return dataConflictResponse(res, "User already exists");
  } catch (err) {
    return badRequestResponse(res, err.message);
  }
};

const login = async (req, res, next) => {
  try {
    await validateLogin(req.body);
    const result = await authService.login(req.body);
    if (result === 400) {
      return badRequestResponse(res, "User already logged in");
    }
    if (result === 401) {
      return unauthorizedResponse(res, "Wrong email or password");
    }
    return okResponse(res, result);
  } catch (err) {
    if (err.message === "Invalid credentials") {
      return badRequestResponse(res, err.message);
    }
    if (err.isJoi) {
      const message = err.details
        ? err.details.map((detail) => detail.message).join(", ")
        : err.message;
      return badRequestResponse(res, message);
    }
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user.id);
    return okResponse(res, "User logged out successfully");
  } catch (err) {
    console.log("Logout error:", err.message);
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const result = await authService.getUser(req.user.id);
    return okResponse(res, result);
  } catch (err) {
    next(err);
  }
};

const editUser = async (req, res, next) => {
  try {
    await validateEditUser(req.body);
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "SoYummy/User",
        width: 44,
        crop: "scale",
        radius: "max",
        quality: "auto:eco",
        fetch_format: "auto",
      });
      req.body.avatar = uploadResult.secure_url;
      const result = await authService.editUser(req.user.id, req.body);
      if (!result) {
        return badRequestResponse(res, "No changes provided");
      }
      return okResponse(res, result);
    }

    const result = await authService.editUser(req.user.id, req.body);
    if (!result) {
      return badRequestResponse(res, "No changes provided");
    }
    return okResponse(res, result);
  } catch (err) {
    if (err.isJoi === true) {
      const message =
        "Bad request, validation errors: " +
        err.details.map((detail) => detail.message).join(", ");
      return badRequestResponse(res, message);
    }
    next(err);
  }
};

module.exports = { register, login, logout, getUser, editUser };

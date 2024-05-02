const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const editUserSchema = Joi.object({
  name: Joi.string(),
  avatar: Joi.string(),
});

const validateRegister = (userData) => {
  return registerSchema.validateAsync(userData, { abortEarly: false });
};

const validateLogin = (userData) => {
  return loginSchema.validateAsync(userData, { abortEarly: false });
};

const validateEditUser = (userData) => {
  return editUserSchema.validateAsync(userData, { abortEarly: false });
};

module.exports = { validateRegister, validateLogin, validateEditUser };

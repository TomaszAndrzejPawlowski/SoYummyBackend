const Joi = require("joi");

const newsletterSchema = Joi.object({
  email: Joi.string().email().required(),
});

const validateEmailForNewsletter = (userData) => {
  return newsletterSchema.validateAsync(userData, { abortEarly: false });
};

module.exports = { validateEmailForNewsletter };

const subscribeService = require("../services/subscribeService");
const sendEmail = require("../middlewares/nwesletterMiddleware");
const {
  badReqResponse,
} = require("../middlewares/commonResponsesMiddleware");
const { okResponse } = require("../middlewares/commonResponsesMiddleware");
const {
  validateEmailForNewsletter,
} = require("../validators/newsletterValidation");

const sendNewsletter = async (req, res, next) => {
  try {
    await validateEmailForNewsletter(req.body);
    const result = await subscribeService.sendNewsletter(
      req.user.id,
      req.user.subscription,
      req.body.email
    );
    if (result === 400) {
      return badReqResponse(res, "User is already subscribed.");
    }
    if (result && result !== 400) {
      sendEmail(req.body.email, result.name);
      return okResponse(res, "Email sent");
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = { sendNewsletter };

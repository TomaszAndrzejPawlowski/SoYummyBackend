const {
  okResponse,
  notFoundResponse,
} = require("../middlewares/commonResponsesMiddleware");
const searchService = require("../services/searchService");

const searchByTitle = async (req, res, next) => {
  try {
    const result = await searchService.searchByTitle(req.body.input);
    if (result) {
      return okResponse(res, result);
    }
    return notFoundResponse(res, "No recipes found");
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = { searchByTitle };

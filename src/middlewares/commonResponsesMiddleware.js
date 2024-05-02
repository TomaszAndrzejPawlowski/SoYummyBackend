const badRequestResponse = (res, message) => {
  res.status(400).json({
    status: "failure",
    code: 400,
    message,
  });
};

const unauthorizedResponse = (res, message) => {
  res.status(401).json({
    status: "failure",
    code: 401,
    message,
  });
};

const notFoundResponse = (res, message) => {
  res.status(404).json({
    status: "failure",
    code: 404,
    message,
  });
};

const dataConflictResponse = (res, message) => {
  res.status(409).json({
    status: "failure",
    code: 409,
    message,
  });
};

const okResponse = (res, result) => {
  res.status(200).json({
    status: "success",
    code: 200,
    result,
  });
};

const dataCreatedResponse = (res, result) => {
  res.status(201).json({
    status: "success",
    code: 201,
    result,
  });
};

module.exports = {
  badRequestResponse,
  unauthorizedResponse,
  notFoundResponse,
  dataConflictResponse,
  okResponse,
  dataCreatedResponse,
};

exports.onSuccess = (response, next) => ({
  statusCode = 200,
  data = {},
}) => response.status(statusCode).json(data).end();

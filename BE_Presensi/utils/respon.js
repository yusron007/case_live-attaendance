const { StatusCodes, getReasonPhrase } = require('http-status-codes');

module.exports = {
  successResponse: (res, message, data = null, statusCode = StatusCodes.OK) => {
    res.status(statusCode).json({
      message: message,
      statusCode: statusCode,
      messageCode: getReasonPhrase(statusCode),
      data: data
    });
  },

  errorResponse: (res, message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR, error = null) => {
    res.status(statusCode).json({
      message: message,
      statusCode: statusCode,
      messageCode: getReasonPhrase(statusCode),
      error: error
    });
  }
};

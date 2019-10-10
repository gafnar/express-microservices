exports.createResponseData = (result, data, extra, errors) => {
  const response = {
    statusCode: result.statusCode,
    body: {
      result: {
        code: result.code,
        message: result.message,
      },
    },
  };
  if (data) {
    response.body.data = data;
  }
  if (extra) {
    response.body.extra = extra;
  }
  if (errors) {
    response.body.errors = errors;
  }
  return response;
};

exports.createInternalResponse = (statusCode, code, message) => ({
  statusCode,
  code,
  message,
});

exports.createGeneralError = err => ({
  statusCode: err.statusCode || 500,
  body: {
    result: {
      code: err.code || '500',
      message: err.message,
    },
    errors: err.errors,
  },
});

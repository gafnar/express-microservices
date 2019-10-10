const { createInternalResponse } = require('../services/response.service');

module.exports = {
  loginOK: createInternalResponse(200, '200', 'User login successfully!'),
  loginErrorKO: createInternalResponse(400, '400', 'Email or password has been incorrect.'),
  authInvalidKO: createInternalResponse(401, '401', 'Unauthorized.'),
};

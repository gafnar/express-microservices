const { createInternalResponse } = require('../services/response.service');

module.exports = {
  registerUserOk: createInternalResponse(201, '201', 'User successfully created'),
  userForgotPasswordOk: createInternalResponse(200, '200', 'Check your email to see the new password'),
  emailExistsKO: createInternalResponse(400, '4001', 'This email is already exists.'),
};

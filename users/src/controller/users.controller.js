const log = require('../services/log.service');
const {
  createUser, forgotPassword,
} = require('../domain/users.domain');

const { createResponseData, createGeneralError } = require('../services/response.service');
const { registerUserOk, userForgotPasswordOk } = require('../responses/users.response');
const { userRegister } = require('../models/users.model');

module.exports = {
  register: async (req, res) => {
    let response;
    try {
      log.info('Start User register...');
      const {
        email,
        name,
        password,
      } = req.body;
      const registerResult = await createUser({ email, name, password });
      log.info('User register finish');
      response = createResponseData(
        registerUserOk,
        userRegister(registerResult),
      );
    } catch (e) {
      response = createGeneralError(e);
    }
    return res.status(response.statusCode).send(response.body);
  },
  forgotPassword: async (req, res) => {
    let response;
    try {
      const {
        email,
      } = req.body;
      await forgotPassword(email);
      response = createResponseData(userForgotPasswordOk);
    } catch (e) {
      response = createGeneralError(e);
    }
    return res.status(response.statusCode).send(response.body);
  },
};

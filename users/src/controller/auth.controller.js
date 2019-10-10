const { validateToken, login } = require('../domain/auth.domain');
const { createGeneralError, createResponseData } = require('../services/response.service');
const { authInvalidKO, loginOK } = require('../responses/auth.response');

module.exports = {
  validateToken: async (req, res, next) => {
    try {
      if (!req.headers.authorization) throw authInvalidKO;
      await validateToken(req.headers.authorization.replace(/^Bearer\s/g, ''));
      return next();
    } catch (e) {
      const response = createGeneralError(e);
      return res.status(response.statusCode).send(response.body);
    }
  },
  login: async (req, res) => {
    let response;
    try {
      const { email, password } = req.body;
      const responseLogin = await login(email, password);
      response = createResponseData(loginOK, responseLogin);
    } catch (e) {
      response = createGeneralError(e);
    }
    return res.status(response.statusCode).send(response.body);
  },
};

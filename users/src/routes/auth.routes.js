const { validate } = require('../services/schema.service');
const { login, validateToken } = require('../controller/auth.controller');
const { loginSchema } = require('./schemas/auth.schema');

exports.assignRoutes = (app, config) => {
  app.use([/(\/file)\/?[A-z 0-9.]*/], validateToken);
  app.post(`${config.app.baseUrl}auth/login`, validate(loginSchema), login);
};

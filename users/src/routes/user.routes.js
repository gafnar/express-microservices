const { validate } = require('../services/schema.service');
const { register, forgotPassword } = require('../controller/users.controller');
const { registerSchema, forgotPasswordSchema } = require('./schemas/user.schema');

exports.assignRoutes = (app, config) => {
  app.post(`${config.app.baseUrl}user`, validate(registerSchema), register);
  app.post(`${config.app.baseUrl}user/forgot-password`, validate(forgotPasswordSchema), forgotPassword);
};

const { validationResult, checkSchema } = require('express-validator');
const { createGeneralError } = require('./response.service');

module.exports = {
  validate: schema => async (req, res, next) => {
    const validations = checkSchema(schema);
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    const errorResponse = createGeneralError({
      statusCode: 400,
      code: '400',
      message: 'validationErrors',
      errors: errors.array(),
    });
    return res.status(errorResponse.statusCode).send(errorResponse.body);
  },
};

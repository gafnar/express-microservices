const jwt = require('jsonwebtoken');

module.exports = {
  encode: (json, signature) => jwt.sign(json, signature),
  decode: (token, signature) => jwt.verify(token, signature),
};

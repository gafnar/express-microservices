const repository = require('../repository/user.repository');
const passwordService = require('../services/password.service');
const { authInvalidKO, loginErrorKO } = require('../responses/auth.response');
const tokenService = require('../services/token.service');
const { tokenSignature } = require('../../config/config');


const loginResponseModel = (user, token) => ({
  email: user.email,
  name: user.name,
  token,
});

module.exports = {
  validateToken: async (token) => {
    const tokenDecode = tokenService.decode(token, tokenSignature);
    if (!tokenDecode) throw authInvalidKO;
    const user = await repository.findOneByEmail(tokenDecode.email);
    if (!user) throw authInvalidKO;
  },
  login: async (email, password) => {
    const user = await repository.findOneByEmail(email);
    if (!user) throw loginErrorKO;
    const isValid = await passwordService.isValidPassword(password, user.password);
    if (!isValid) throw loginErrorKO;
    return loginResponseModel(user, tokenService.encode({ email }, tokenSignature));
  },
};

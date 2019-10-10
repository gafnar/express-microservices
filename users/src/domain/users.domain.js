const repository = require('../repository/user.repository');
const { hashPassword, generatePassword } = require('../services/password.service');
const mailService = require('../services/mail.service');
const { passwordChanged } = require('../responses/mail.response');
const { emailExistsKO } = require('../responses/users.response');

const saveUserModel = async ({ name, email, password }) => {
  const passwordHash = await hashPassword(password);
  return {
    password: passwordHash,
    name,
    email,
  };
};
const saveUser = async user => repository.save({ ...user });

const forgotPassword = async (email) => {
  const user = await repository.findOneByEmail(email);
  if (user) {
    const { _id } = user;
    const password = generatePassword();
    await repository.update(_id, { password: await hashPassword(password) });
    mailService.sendMail(passwordChanged(email, password));
  }
};

module.exports = {
  createUser: async (userToSave) => {
    const user = await repository.findOneByEmail(userToSave.email);
    if (user) throw emailExistsKO;
    return saveUser(await saveUserModel(userToSave));
  },
  forgotPassword: async email => forgotPassword(email),
};

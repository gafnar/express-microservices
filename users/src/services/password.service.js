const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  isValidPassword: (password, hashedPassword) => bcrypt.compare(password, hashedPassword),
  hashPassword: password => bcrypt.hash(password, saltRounds),
  generatePassword: () => Math.random().toString(36).slice(2),
};

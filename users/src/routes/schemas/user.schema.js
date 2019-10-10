module.exports = {
  registerSchema: {
    name: {
      isString: true,
    },
    email: {
      isString: true,
      isEmail: true,
    },
    password: {
      isString: true,
    },
  },
  forgotPasswordSchema: {
    email: {
      isString: true,
      isEmail: true,
    },
  },
};

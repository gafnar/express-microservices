module.exports = {
  passwordChanged: (email, password) => ({
    email,
    subject: 'Your password hass been changed',
    text: `Hello your password hass been changed to ${password},`,
  }),
};

const nodemailer = require('nodemailer');
const log = require('./log.service');
const { mail: { config, from } } = require('../config/config');


const transporter = nodemailer.createTransport(config);
const sendMail = async ({ email, subject, text }) => {
  try {
    return await transporter.sendMail({
      from,
      to: email,
      subject,
      text,
    });
  } catch (err) {
    log.err(`Email has not send ${err}`);
  }
  return null;
};

module.exports = {
  sendMail,
};

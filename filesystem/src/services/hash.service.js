const crypto = require('crypto');

const createHash = () => crypto.createHash('md5').update(`${Math.round((new Date()).getTime() / 1000)}${Math.floor(Math.random() * 1000) + 1}`).digest('hex');
module.exports = {
  createHash,
};

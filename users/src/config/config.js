module.exports = {
  logLevel: process.env.LOG_LEVEL,
  app: {
    name: 'users-microservice',
    port: parseInt(process.env.PORT, 10) || 8080,
    url: process.env.APP_URL || 'http://localhost',
    baseUrl: '/',
  },
  tokenSignature: process.env.TOKEN_SIGNATURE || '',
  mongo: {
    uri: process.env.MONGO_URI,
  },
  mail: {
    config: {
      host: process.env.HOST_MAIL,
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL,
      },
    },
  },
};

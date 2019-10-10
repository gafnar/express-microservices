module.exports = {
  logLevel: process.env.LOG_LEVEL,
  app: {
    name: 'doc-microservice',
    port: parseInt(process.env.PORT, 10) || 8080,
    url: process.env.APP_URL || 'http://localhost',
    baseUrl: '/',
  },
};

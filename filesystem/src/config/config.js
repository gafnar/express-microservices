module.exports = {
  app: {
    name: 'filesystem-microservice',
    port: parseInt(process.env.PORT, 10) || 3015,
    url: process.env.APP_URL || 'http://localhost',
    baseUrl: '/',
  },
  s3: {
    key: process.env.S3_KEY || '',
    secret: process.env.S3_SECRET || '',
    bucket: process.env.S3_BUCKET || '',
    folder: '',
  },
  mongo: {
    uri: process.env.MONGO_URI,
  },
};

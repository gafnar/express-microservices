// Set up mongoose connection
const mongoose = require('mongoose');
const log = require('../services/log.service');

const { config } = global;
const setConnection = () => mongoose.connect(config.mongo.uri, { useNewUrlParser: true });
setConnection();
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('connected', () => {
  log.info('Mongo is connected');
});
db.on('error', (err) => {
  log.error(`MongoDB connection error: ${err}`);
  setTimeout(setConnection, 5000);
});

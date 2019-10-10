/* eslint-disable no-unused-vars */
const express = require('express');
const swagger = require('swagger-ui-express');
const swaggerDoc = require('./config/swagger');
const config = require('./config/config');

const app = express();

app.use('/docs', swagger.serve, swagger.setup(swaggerDoc));

module.exports = app;

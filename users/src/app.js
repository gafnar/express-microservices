/* eslint-disable no-unused-vars */
const express = require('express');
const routes = require('./routes/routes');
const config = require('./config/config');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
  next();
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));
routes.assignRoutes(app, config);

module.exports = app;

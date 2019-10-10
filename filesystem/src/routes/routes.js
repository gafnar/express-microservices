const { validate } = require('../services/schema.service');
const {
  createAndUploadFile, deleteFile, changeNameFile, getFile, downloadFile,
} = require('../controller/file.controller');
const { renameFileSchema } = require('./schemas/file.schema');

exports.assignRoutes = (app, config) => {
  app.post(`${config.app.baseUrl}file`, createAndUploadFile);
  app.delete(`${config.app.baseUrl}file/:key`, deleteFile);
  app.put(`${config.app.baseUrl}file/:key`, validate(renameFileSchema), changeNameFile);
  app.get(`${config.app.baseUrl}file/:key`, getFile);
  app.get(`${config.app.baseUrl}file/download/:key`, downloadFile);
};

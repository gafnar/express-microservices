const { createGeneralError, createResponseData } = require('../services/response.service');
const {
  fileCreatedOK, fileNotSendKO, fileGetUrlOK, fileDeletedOK,
} = require('../responses/file.response');
const {
  createAndUploadFile, getFileByKey, deletedByKey, changedName, downloadFile,
} = require('../domain/file.domain');

const expressDownloadFile = (res, {mimetype, filename, contentLength, body}) => {
  res.writeHead(200, {
    'Content-Type': mimetype,
    'Content-disposition': `attachment;filename=${filename}`,
    'Content-Length': contentLength,
  });
  return res.end(body, 'binary');
};

const nameBeautify = name => name.toLowerCase().replace(/\s/, '');

module.exports = {
  createAndUploadFile: async (req, res) => {
    let response;
    try {
      if (!req.files || !req.files.file) throw fileNotSendKO;
      const { data, name, mimetype } = req.files.file;
      const uploadResponse = await createAndUploadFile(nameBeautify(name), data, mimetype);
      response = createResponseData(fileCreatedOK, uploadResponse);
    } catch (e) {
      response = createGeneralError(e);
    }
    return res.status(response.statusCode).send(response.body);
  },
  deleteFile: async (req, res) => {
    let response;
    try {
      const { key } = req.params;
      await deletedByKey(key);
      response = createResponseData(fileDeletedOK);
    } catch (e) {
      response = createGeneralError(e);
    }
    return res.status(response.statusCode).send(response.body);
  },
  changeNameFile: async (req, res) => {
    let response;
    try {
      const { key } = req.params;
      const { name } = req.body;
      const changeNameResponse = await changedName(key, nameBeautify(name));
      response = createResponseData(fileGetUrlOK, changeNameResponse);
    } catch (e) {
      response = createGeneralError(e);
    }
    return res.status(response.statusCode).send(response.body);
  },
  getFile: async (req, res) => {
    let response;
    try {
      const { key } = req.params;
      const getFileResponse = await getFileByKey(key);
      response = createResponseData(fileGetUrlOK, getFileResponse);
    } catch (e) {
      response = createGeneralError(e);
    }
    return res.status(response.statusCode).send(response.body);
  },
  downloadFile: async (req, res) => {
    let response;
    try {
      const { key } = req.params;
      const getDownloadResponse = await downloadFile(key);
      return expressDownloadFile(res, getDownloadResponse);
    } catch (e) {
      response = createGeneralError(e);
    }
    return res.status(response.statusCode).send(response.body);
  },

};

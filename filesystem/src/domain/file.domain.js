const repository = require('../repository/file.repository');
const fileService = require('../services/file.service');
const log = require('../services/log.service');
const { fileUploadKO, fileNotFoundKO, fileDeletedKO } = require('../responses/file.response');

const uploadFile = async (key, file) => {
  try {
    return await fileService.uploadFile(key, file);
  } catch (err) {
    log.error(`fileService error: ${err}`);
    throw fileUploadKO;
  }
};

const deletedFile = async (key) => {
  try {
    await fileService.deleteFile(key);
  } catch (err) {
    log.error(`fileService error: ${err}`);
    throw fileDeletedKO;
  }
};

const getFileByKey = async (key) => {
  const file = await repository.findOneByKey(key);
  if (!file) throw fileNotFoundKO;
  return file;
};

const fileResponseModel = (file) => ({
  name: file.name,
  key: file.key,
  url: file.url,
});

const downloadResponseModel = (file, mimetype, filename) => ({
  body: file.Body,
  contentLength: file.ContentLength,
  mimetype,
  filename,
});

module.exports = {
  createAndUploadFile: async (name, file, mimetype) => {
    const key = fileService.createKey(name);
    const { url } = await uploadFile(key, file);
    return fileResponseModel(await repository.save({ key, url, name, mimetype }));
  },
  getFileByKey: async key => fileResponseModel(await getFileByKey(key)),
  deletedByKey: async (key) => {
    const { _id } = await getFileByKey(key);
    await deletedFile(key);
    await repository.deleteById(_id);
  },
  changedName: async (key, name) => {
    const { _id } = await getFileByKey(key);
    return fileResponseModel(await repository.update(_id, { name }));
  },
  downloadFile: async (key) => {
    const { mimetype, name } = await getFileByKey(key);
    const result = await fileService.getFileByKey(key);
    if(!result) throw fileNotFoundKO;
    return downloadResponseModel(result, mimetype, name);
  },
};

const { S3 } = require('aws-sdk');
const { s3: s3Config } = require('../config/config');
const { createHash } = require('./hash.service');

const { folder, bucket } = s3Config;

const s3Bucket = new S3({
  accessKeyId: s3Config.key,
  secretAccessKey: s3Config.secret,
});

const getFileByKey = key => new Promise((resolve, reject) => {
  s3Bucket.getObject({
    Bucket: bucket,
    Key: `${folder}${key}`,
  }, (err, data) => {
    if (err) reject(err);
    resolve(data);
  });
});

const uploadFile = (key, file) => new Promise((resolve, reject) => s3Bucket.upload({
  Bucket: bucket,
  Key: `${folder}${key}`,
  Body: file,
}, {},
(err, data) => {
  if (err) reject(err);
  resolve({
    url: data.Location,
    key: data.Key,
  });
}));

const deleteFile = key => new Promise((resolve, reject) => {
  s3Bucket.deleteObject({
    Bucket: bucket,
    Key: `${folder}${key}`,
  }, (err, data) => {
    if (err) reject(err);
    resolve(data);
  });
});

const getExtension = (name) => {
  const nameArray = name.split('.');
  if (nameArray.length === 1) return '';
  return `.${nameArray[nameArray.length - 1]}`;
};

const createKey = name => `${createHash()}${getExtension(name)}`;

module.exports = {
  uploadFile,
  deleteFile,
  getFileByKey,
  createKey,
};

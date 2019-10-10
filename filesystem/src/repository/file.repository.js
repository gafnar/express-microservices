const mongoose = require('mongoose');

const schemaFiles = {
  name: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
};
const schema = new mongoose.Schema(schemaFiles, { timestamps: true });

const Files = mongoose.model('Files', schema, 'files');

const findOneByKey = key => new Promise((resolve, reject) => {
  Files.findOne({ key }, (err, res) => {
    if (err) reject(err);
    else resolve((res) ? res.toObject() : res);
  });
});

const save = ({
  key, name, url, mimetype,
}) => new Promise((resolve, reject) => Files.create({
  key, name, url, mimetype,
}, (err, res) => {
  if (err) reject(err);
  else resolve((res) ? res.toObject() : res);
}));

const update = (
  _id, file,
) => new Promise((resolve, reject) => Files.findOneAndUpdate({ _id }, { ...file }, { new: true },
  (err, res) => {
    if (err) reject(err);
    else resolve((res) ? res.toObject() : res);
  }));

const deleteById = _id => new Promise((resolve, reject) => Files.deleteOne({ _id }, (err, res) => {
  if (err) reject(err);
  else resolve(res);
}));

module.exports = {
  findOneByKey,
  update,
  save,
  deleteById,
};

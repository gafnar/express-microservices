const mongoose = require('mongoose');

const schemaUsers = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
};
const schema = new mongoose.Schema(schemaUsers, { timestamps: true });

const Users = mongoose.model('Users', schema, 'users');

const findOneByEmail = email => new Promise(((resolve, reject) => {
  Users.findOne({ email }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve((res) ? res.toObject() : res);
    }
  });
}));

const save = ({
  id, name, email, password,
}) => new Promise(((resolve, reject) => {
  Users.create({
    id, name, email, password,
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve((res) ? res.toObject() : res);
    }
  });
}));

const update = (
  _id, user,
) => new Promise(((resolve, reject) => {
  Users.findOneAndUpdate({ _id }, { ...user }, {}, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve((res) ? res.toObject() : res);
    }
  });
}));

module.exports = {
  findOneByEmail,
  update,
  save,
};

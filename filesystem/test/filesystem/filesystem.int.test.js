global.config = require('../mocks/config');
const request = require('supertest');
const repository = require('../../src/filesystem/repository/file.repository');
const app = require('../../src/app');

// Mock the route configuration so that only stay the filesytem microservice
jest.mock('../../src/filesystem/services/file.service', () => require('../mocks/file.service'));
jest.mock('../../src/config/config', () => require('../mocks/config'));

describe('Test request filesystem', () => {
  const  agent = request(app);
  test('Filesystem upload: should correctly upload', (done) => {
    repository.save = jest.fn(() => ({}));
    agent
      .post('/file')
      .attach('file', `${__dirname}/../mocks/config.js`)
      .expect('Content-Type', /application\/json/)
      .expect(201)
      .end((err, res) => {
        if (err) throw done(err);
        expect(repository.save.mock.calls.length).toBe(1);
        expect(typeof res.body).toBe('object');
        expect(typeof res.body.result).toBe('object');
        expect(res.body.result.code).toBe('201');
        expect(res.body.result.message).toBe('File successfully created!');
        repository.save.mockClear();
        done();
      });
  });

  test('Filesystem delete: should correctly remove item', (done) => {
    repository.deleteById = jest.fn(() => ({}));
    repository.findOneByKey = jest.fn(() => ({_id: '123'}));
    agent
      .delete('/file/prueba')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw done(err);
        expect(repository.deleteById.mock.calls.length).toBe(1);
        expect(repository.findOneByKey.mock.calls.length).toBe(1);
        expect(typeof res.body).toBe('object');
        expect(typeof res.body.result).toBe('object');
        expect(res.body.result.code).toBe('200');
        repository.deleteById.mockClear();
        repository.findOneByKey.mockClear();
        done();
      });
  });

  test('Filesystem delete: should return file not found', (done) => {
    repository.findOneByKey = jest.fn(() => null);
    agent
      .delete('/file/prueba')
      .expect('Content-Type', /application\/json/)
      .expect(404)
      .end((err, res) => {
        if (err) throw done(err);
        expect(repository.findOneByKey.mock.calls.length).toBe(1);
        expect(typeof res.body).toBe('object');
        expect(typeof res.body.result).toBe('object');
        expect(res.body.result.code).toBe('404');
        repository.findOneByKey.mockClear();
        done();
      });
  });

  test('Filesystem getFile: should return file', (done) => {
    repository.findOneByKey = jest.fn(() => ({ name: '', _id: '124', url: 'http://url.com/prueba.jpg', key: 'prueba.jpg' }));
    agent
      .get('/file/prueba')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw done(err);
        expect(repository.findOneByKey.mock.calls.length).toBe(1);
        expect(typeof res.body).toBe('object');
        expect(typeof res.body.result).toBe('object');
        expect(res.body.result.code).toBe('200');
        repository.findOneByKey.mockClear();
        done();
      });
  });

  test('Filesystem getFile: should return file not found', (done) => {
    repository.findOneByKey = jest.fn(() => null);
    agent
      .get('/file/prueba')
      .expect('Content-Type', /application\/json/)
      .expect(404)
      .end((err, res) => {
        if (err) throw done(err);
        expect(repository.findOneByKey.mock.calls.length).toBe(1);
        expect(typeof res.body).toBe('object');
        expect(typeof res.body.result).toBe('object');
        expect(res.body.result.code).toBe('404');
        repository.findOneByKey.mockClear();
        done();
      });
  });

  test('Filesystem update file: should return file not found', (done) => {
    repository.findOneByKey = jest.fn(() => null);
    agent
      .put('/file/prueba')
      .send({ name: 'prueba2' })
      .expect('Content-Type', /application\/json/)
      .expect(404)
      .end((err, res) => {
        if (err) throw done(err);
        expect(repository.findOneByKey.mock.calls.length).toBe(1);
        expect(typeof res.body).toBe('object');
        expect(typeof res.body.result).toBe('object');
        expect(res.body.result.code).toBe('404');
        repository.findOneByKey.mockClear();
        done();
      });
  });

  test('Filesystem update file: should return file and update this', (done) => {
    repository.findOneByKey = jest.fn(() => ({ name: '', _id: '124', url: 'http://url.com/prueba.jpg', key: 'prueba.jpg' }));
    repository.update = jest.fn(() => ({ name: 'prueba2', _id: '124', url: 'http://url.com/prueba.jpg', key: 'prueba.jpg' }));
    agent
      .put('/file/prueba')
      .send({ name: 'prueba2' })
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw done(err);
        expect(repository.findOneByKey.mock.calls.length).toBe(1);
        expect(repository.update.mock.calls.length).toBe(1);
        expect(typeof res.body).toBe('object');
        expect(typeof res.body.result).toBe('object');
        expect(typeof res.body.data).toBe('object');
        expect(res.body.data.name).toBe('prueba2');
        expect(res.body.result.code).toBe('200');
        repository.findOneByKey.mockClear();
        repository.update.mockClear();
        done();
      });
  });

  test('Filesystem download file: should return file binary', (done) => {
    repository.findOneByKey = jest.fn(() => ({ name: '', _id: '124', url: 'http://url.com/prueba.jpg', key: 'prueba.jpg', mimetype: 'image/jpeg' }));
    agent
      .get('/file/download/prueba')
      .send({ name: 'prueba2' })
      .expect(200)
      .end((err, res) => {
        if (err) throw done(err);
        expect(repository.findOneByKey.mock.calls.length).toBe(1);
        expect(typeof res.body).toBe('object');
        repository.findOneByKey.mockClear();
        done();
      });
  });
});

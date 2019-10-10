global.config = require('../mocks/config');
const request = require('supertest');
const repository = require('../../src/users/repository/user.repository');
const app = require('../../src/app');

jest.mock('../../src/config/db', () => {});
jest.mock('../../src/users/services/mail.service', () => require('../mocks/mail.service'));
jest.mock('../../src/config/config', () => require('../mocks/config'));

describe('Test request user', () => {
  const  agent = request(app);

  test('User create: should correctly create user', async (done) => {
    repository.findOneByEmail = jest.fn(() => null);
    repository.save = jest.fn(() => ({ name: 'Jorge', email: 'jorge@jorge.com', password: '$2b$10$E1wyynTCNuwqC8i3z85cZO02Wzbh4cAtqTf3aJMGRuKEB9S6aUZlu' }));
    agent
      .post('/user')
      .send({ email: 'jorge@jorge.com', password: 'password', name: 'Jorge' })
      .expect('Content-Type', /application\/json/)
      .expect(201)
      .end((err, res) => {
        if (err) throw done(err);
        expect(repository.findOneByEmail.mock.calls.length).toBe(1);
        expect(typeof res.body).toBe('object');
        expect(typeof res.body.data).toBe('object');
        expect(typeof res.body.data.email).toBe('string');
        expect(res.body.data.email).toBe('jorge@jorge.com');
        expect(typeof res.body.data.name).toBe('string');
        expect(res.body.data.name).toBe('Jorge');
        repository.findOneByEmail.mockClear();
        repository.save.mockClear();
        done();
      });
  });

  test('User create: should correctly create user', async (done) => {
    repository.findOneByEmail = jest.fn(() => true);
    agent
      .post('/user')
      .send({ email: 'jorge@jorge.com', password: 'password', name: 'Jorge' })
      .expect('Content-Type', /application\/json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw done(err);
        expect(repository.findOneByEmail.mock.calls.length).toBe(1);
        expect(typeof res.body).toBe('object');
        expect(typeof res.body.result).toBe('object');
        expect(typeof res.body.result.code).toBe('string');
        expect(res.body.result.code).toBe('4001');
        expect(typeof res.body.result.message).toBe('string');
        expect(res.body.result.message).toBe('This email is already exists.');
        repository.findOneByEmail.mockClear();
        done();
      });
  });


  test('Forgot password: should correctly send', async (done) => {
    repository.findOneByEmail = jest.fn(() => ({email: 'jorge@jorge.com'}));
    repository.update = jest.fn(() => ({email: 'jorge@jorge.com'}));
    agent
      .post('/user/forgot-password')
      .send({ email: 'jorge@jorge.com', password: 'password', name: 'Jorge' })
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw done(err);
        expect(repository.findOneByEmail.mock.calls.length).toBe(1);
        expect(repository.update.mock.calls.length).toBe(1);
        expect(typeof res.body).toBe('object');
        expect(typeof res.body.result).toBe('object');
        expect(typeof res.body.result.code).toBe('string');
        expect(res.body.result.code).toBe('200');
        expect(typeof res.body.result.message).toBe('string');
        expect(res.body.result.message).toBe('Check your email to see the new password');
        repository.findOneByEmail.mockClear();
        repository.update.mockClear();
        done();
      });
  });

  test('Forgot password: should correctly but not send email', async (done) => {
    repository.findOneByEmail = jest.fn(() => null);
    repository.update = jest.fn(() => null);
    agent
      .post('/user/forgot-password')
      .send({ email: 'jorge@jorge.com', password: 'password', name: 'Jorge' })
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw done(err);
        expect(repository.findOneByEmail.mock.calls.length).toBe(1);
        expect(repository.update.mock.calls.length).toBe(0);
        expect(typeof res.body).toBe('object');
        expect(typeof res.body.result).toBe('object');
        expect(typeof res.body.result.code).toBe('string');
        expect(res.body.result.code).toBe('200');
        expect(typeof res.body.result.message).toBe('string');
        expect(res.body.result.message).toBe('Check your email to see the new password');
        repository.findOneByEmail.mockClear();
        repository.update.mockClear();
        done();
      });
  });
});
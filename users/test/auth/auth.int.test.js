global.config = require('../mocks/config');
const request = require('supertest');
const repository = require('../../src/users/repository/user.repository');
const tokenService = require('../../src/users/services/token.service');
const authController = require('../../src/users/controller/auth.controller');
const app = require('../../src/app');
jest.mock('../../src/config/db', () => {});
jest.mock('../../src/config/config', () => require('../mocks/config'));

describe('Test request auth', () => {
  const  agent = request(app);
  test('Login: should correctly login', done => {
    repository.findOneByEmail = jest.fn(() => ({ name: 'Jorge', email: 'jorge@jorge.com', password: '$2b$10$E1wyynTCNuwqC8i3z85cZO02Wzbh4cAtqTf3aJMGRuKEB9S6aUZlu' }));
    agent
      .post('/auth/login')
      .send({ email: 'jorge@jorge.com', password: 'password' })
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .end((err, res) => {
        if (err) throw done(err);
        expect(repository.findOneByEmail.mock.calls.length).toBe(1);
        expect(typeof res.body).toBe('object');
        expect(typeof res.body.data).toBe('object');
        expect(typeof res.body.data.email).toBe('string');
        expect(typeof res.body.data.name).toBe('string');
        expect(typeof res.body.data.token).toBe('string');
        repository.findOneByEmail.mockClear();
        done();
      });
  });

  test('Login: should fail login', done => {
    repository.findOneByEmail = jest.fn(() => null);
    agent
      .post('/auth/login')
      .send({ email: 'jorge@jorge.com', password: 'password' })
      .expect('Content-Type', /application\/json/)
      .expect(400)
      .end((err, res) => {
        if (err) throw done(err);
        expect(repository.findOneByEmail.mock.calls.length).toBe(1);
        expect(typeof res.body).toBe('object');
        expect(typeof res.body.result).toBe('object');
        expect(res.body.result.code).toBe('400');
        expect(res.body.result.message).toBe('Email or password has been incorrect.');
        repository.findOneByEmail.mockClear();
        done();
      });
  });
});

describe('Test validate token', () => {
  const res = {
    status: () => ({
      send: () => false,
    }),
  };
  const next = () => true;

  test('Token: should be a valid token', async (done) => {
    tokenService.decode = () => ({email: 'jorge@jorge.com'});
    repository.findOneByEmail = jest.fn(() => ({email: 'jorge@jorge.com'}));
    const req = {
      headers: {
        authorization: 'bearer 1234',
      }
    };
    const constrollerResponse = await authController.validateToken(req, res, next);
    expect(constrollerResponse).toBe(true);
    repository.findOneByEmail.mockClear();
    done();
  });

  test('Token: should be a invalid token', async (done) => {
    tokenService.decode = () => null;
    const req = {
      headers: {
        authorization: 'bearer 1234',
      }
    };
    const constrollerResponse = await authController.validateToken(req, res, next);
    expect(constrollerResponse).toBe(false);
    done();
  });

  test('Token: user not exists', async (done) => {
    tokenService.decode = () => ({email: 'jorge@jorge.com'});
    repository.findOneByEmail = jest.fn(() => null);
    const req = {
      headers: {
        authorization: 'bearer 1234',
      }
    };
    const constrollerResponse = await authController.validateToken(req, res, next);
    expect(constrollerResponse).toBe(false);
    done();
  });
});
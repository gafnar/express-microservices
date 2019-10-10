global.config = require('../../src/config/config');
const passwordService = require('../../src/users/services/password.service');

describe('test password', () => {
  test('generatePassword', () => {
    for(let i = 0; i < 100; i += 1) {
      const password = passwordService.generatePassword();
      expect(typeof password).toBe('string');
      expect(/[a-z 0-9]*/.test(password)).toBe(true);
    }
  });

  test('hashPassword', async () => {
    const password = await passwordService.hashPassword(passwordService.generatePassword());
    expect(typeof password).toBe('string');
    expect(/[a-z 0-9]*/.test(password)).toBe(true);
  });

  test('isValidPassword', async () => {
    const password = passwordService.generatePassword();
    const passwordHash = await passwordService.hashPassword(password);
    expect(await passwordService.isValidPassword(password, passwordHash)).toBe(true);
    expect(await passwordService.isValidPassword('1234', passwordHash)).toBe(false);
  })
});
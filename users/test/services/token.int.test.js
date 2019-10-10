global.config = require('../../src/config/config');
const tokenService = require('../../src/users/services/token.service');

const iat = Math.floor(Date.now() / 1000) + 3600; //Token expired
const tokensValidator = [
  [ { email: 'jorge@jorge.com', iat }, 'test1', { email: 'jorge@jorge.com', iat }],
  [ 'jorge', 'test2', 'jorge'],
  [ 123, 'test3', '123'],
];

describe.each(tokensValidator)('tokenService', (json, signature, expected) => {
  test(`returns ${expected}`, () => {
    const output = tokenService.encode(json,signature);
    expect(typeof output).toBe('string');
    const outputDecode = tokenService.decode(output, signature);
    if(typeof outputDecode === 'object') {
      expect(outputDecode.email).toBe(expected.email);
      expect(outputDecode.iat).toBe(expected.iat);
    } else expect(outputDecode).toBe(expected);
  });
});
global.config = require('../../src/config/config');
const hashService = require('../../src/filesystem/services/hash.service');

describe('create hash test', () => {
  test('Hash correctly return', () => {
    for(let i = 0; i < 100; i += 1) {
      const hash = hashService.createHash();
      expect(typeof hash).toBe('string');
      expect(/[a-z 0-9]*/.test(hash)).toBe(true);
    }
  });
});
'use strict';

const bcrypt = require('bcrypt');
const { assert } = require('chai');

describe('bcrypt', () => {
  describe('#hash()', () => {
    it('given a plain text, and get back bcrypt hashed text', async () => {
      const plainText = 'test';
      const hashedText = await bcrypt.hash(plainText, 10);
      assert.exists(hashedText);
      assert.notStrictEqual(plainText, hashedText);
      assert.isTrue(await bcrypt.compare(plainText, hashedText));
      console.log(`plain text: ${plainText}`);
      console.log(`hashed text: ${hashedText}`);
    });
  });
});

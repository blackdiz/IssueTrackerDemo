'use strict';

const { assert } = require('chai');
const accountRepository = require('../src/repositories/account-repository');
const transaction = require('../src/utils/transaction');
const bcrypt = require('bcrypt');

describe('account-repository', () => {
  describe('#save(account)', () => {
    it('test save account to database and get back', async () => {
      const tx = await transaction();
      const newAccount = {
        name: 'test_name',
        active: true
      };
      newAccount.password = await bcrypt.hash('test_password', 10);

      await accountRepository.save(newAccount, tx);
      const account = await accountRepository.findByName('test_name', tx);
      console.log(account);
      assert.strictEqual('test_name', account.name);
      await tx.rollback();
    });
  });
});

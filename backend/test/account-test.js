'use strict';

const { assert } = require('chai');
const accountRepository = require('../src/repositories/account-repository');
const { transaction } = require('objection');
const conn = require('../src/config/db');
const bcrypt = require('bcrypt');

describe('account-repository', () => {
  describe('#save(account)', () => {
    it('test save account to database and get back', async () => {
      const tx = await transaction.start(conn);
      const newAccount = {
        name: 'name',
        firstName: 'firstname',
        lastName: 'lastname',
        email: '123',
        createTime: new Date(),
        lastUpdateTime: new Date(),
        active: true
      };
      newAccount.password = await bcrypt.hash('123', 10);

      await accountRepository.save(newAccount, tx);
      const account = await accountRepository.get('name', tx);
      assert.strictEqual(1, account.length);
      assert.strictEqual('name', account[0].name);
      console.log(account[0]);
      await tx.rollback();
    });
  });
});

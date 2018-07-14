'use strict';

const { assert } = require('chai');
const accountRepository = require('../src/repositories/account-repository');
const transaction = require('../src/utils/transaction');
const { UniqueViolationError } = require('objection-db-errors');
const bcrypt = require('bcrypt');

describe('account-repository', () => {
  let tx;

  beforeEach(async () => {
    tx = await transaction();
  });

  describe('#save(account)', () => {
    it('test save account to database and get back', async () => {
      tx = await transaction();
      const newAccount = {
        name: 'test_name',
        active: true
      };
      newAccount.password = await bcrypt.hash('test_password', 10);

      await accountRepository.save(newAccount, tx);
      const account = await accountRepository.findByName('test_name', tx);
      console.log(account);
      assert.strictEqual('test_name', account.name);
    });
    it('save same account name should throw an UniqueViolationError', async () => {
      const newAccount = {
        name: 'test_name',
        password: 'test',
        active: true
      };

      await accountRepository.save(newAccount, tx);
      try {
        const secondAccount = {
          name: 'test_name',
          password: 'test2',
          active: false
        };
        await accountRepository.save(secondAccount, tx);
      } catch (err) {
        assert.instanceOf(err, UniqueViolationError);
      }
    });
  });
  afterEach(async () => {
    await tx.rollback();
  });
});

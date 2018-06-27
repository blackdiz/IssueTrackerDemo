'use strict';

const { assert } = require('chai');
const userRepository = require('../src/repositories/account-repository');
const { transaction } = require('objection');
const conn = require('../config/db');

describe('user-repository', () => {
  describe('#save(user)', () => {
    it('should insert user to database', async () => {
      const tx = await transaction.start(conn);
      await userRepository.save(
        {
          name: 'name',
          first_name: 'firstname',
          last_name: 'lastname',
          password: '123',
          email: '123',
          create_time: new Date(),
          last_update_time: new Date()
        },
        tx
      );
      const account = await userRepository.get('name', tx);

      console.log(account);
      await tx.commit();
    });
  });
});

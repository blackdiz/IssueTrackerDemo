'use strict';

const assert = require('assert');
const { Pool } = require('pg');
const fs = require('fs');

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
      const config = fs.readFileSync(`${__dirname}/../config/db.json`);
      console.log(config);
      const pool = new Pool(JSON.parse(config));
      pool.query('select now()', (err, res) => {
        console.log(err, res);
        pool.end();
      });
    });
  });
});

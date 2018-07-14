'use strict';

class AuthenticationError extends Error {
  constructor(accountName) {
    super();
    this.name = this.constructor.name;
    this.message = `${accountName}'s password is invalid`;
    Error.captureStackTrace(this, AuthenticationError);
  }
}

module.exports = AuthenticationError;

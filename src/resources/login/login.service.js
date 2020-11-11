const usersRepo = require('../users/user.DB.repository');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { FORBIDDEN } = require('http-status-codes');
const { checkHashedPassword } = require('../../utils/hashHelper');
const { ErrorHandler } = require('../../common/error');
const {
  INCORRECT_LOGIN_OR_PASSWORD,
  ERRORS
} = require('../../common/constants');

const signToken = async user => {
  const getUser = await usersRepo.getByLogin(user);
  if (!getUser) {
    throw new ErrorHandler(FORBIDDEN, ERRORS.INCORRECT_LOGIN_OR_PASSWORD);
  }
  const isPasswordValide = await checkHashedPassword(
    user.password,
    getUser.password
  );

  if (!isPasswordValide) {
    throw new ErrorHandler(FORBIDDEN, INCORRECT_LOGIN_OR_PASSWORD);
  }
  const { id, login } = getUser;
  const token = jwt.sign({ id, login }, JWT_SECRET_KEY);
  return token;
};

module.exports = {
  signToken
};

const bcrypt = require('bcrypt');
const { DEFAULT_SALT_ROUNDS } = require('../common/constants');

const hashPassword = async ({ password }) => {
  const salt = await bcrypt.genSalt(DEFAULT_SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const checkHashedPassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = {
  hashPassword,
  checkHashedPassword
};

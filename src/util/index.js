const bcrypt = require('bcrypt');
const { hashRounds } = require('../config/index');

const hashPassword = (password) => {
  const newPassword = bcrypt.hashSync(password, Number(hashRounds));
  return newPassword;
};

const isCorrectPassword = (password, hashPassword) => {
  let checkPassword = bcrypt.compareSync(password, hashPassword);
  return checkPassword;
};

const createPasswordChangedToken = () => {};

module.exports = {
  hashPassword,
  isCorrectPassword,
  createPasswordChangedToken,
};

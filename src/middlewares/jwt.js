const jwt = require('jsonwebtoken');
const { secretToken, refreshToken, expriesToken, expriesRefreshToken } = require('../config/index');

const jwtController = {
  generateToken: (data) => {
    let { user_id, email, name, isAdmin } = data;
    const token = jwt.sign({ user_id, email, name, isAdmin }, secretToken, { expiresIn: `${Number(expriesToken)}m` });
    return token;
  },

  generateRefreshToken: (data) => {
    let { user_id, email, name, isAdmin } = data;
    const refToken = jwt.sign({ user_id, email, name, isAdmin }, refreshToken, {
      expiresIn: `${Number(expriesRefreshToken)}d`,
    });
    return refToken;
  },

  checkToken: (token) => {},

  verifyToken: () => {},

  authAdmin: () => {},
};

module.exports = jwtController;

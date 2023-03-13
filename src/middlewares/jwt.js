const jwt = require('jsonwebtoken');
const { JsonWebTokenError } = require('jsonwebtoken');
const responseMess = require('../config/response');
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

  checkRefreshToken: (refToken) => {
    const user = jwt.verify(refToken, refreshToken);
    return user;
  },

  checkAccessToken: (token) => {
    const user = jwt.verify(token, secretToken);
    return user;
  },

  verifyToken: (req, res, next) => {
    try {
      let { authorization } = req.headers;
      let accessToken = authorization.replace('Bearer ', '');
      let cookieToken = req.cookies.refreshToken;
      if (accessToken || cookieToken) {
        let verifyAccessToken = jwt.verify(accessToken, secretToken);
        let verifyCookies = jwt.verify(cookieToken, refreshToken);
        if (verifyAccessToken && verifyCookies) {
          next();
          return;
        }
      } else {
        return responseMess.unauthorized(res, '', 'Required invalid token!');
      }
    } catch (err) {
      responseMess.unauthorized(res, '', err.message);
    }
  },

  authAdmin: (req, res, next) => {
    try {
      let { authorization } = req.headers;
      let accessToken = authorization.replace('Bearer ', '');
      let cookieToken = req.cookies.refreshToken;
      if (accessToken || cookieToken) {
        let verifyAccessToken = jwt.verify(accessToken, secretToken);
        let verifyCookies = jwt.verify(cookieToken, refreshToken);
        if (verifyAccessToken && verifyCookies) {
          let { isAdmin } = verifyAccessToken;
          if (isAdmin) {
            next();
            return;
          } else {
            return responseMess.unauthorized(res, '', 'Unauthorized. No permission to perform this action!');
          }
        }
      } else {
        return responseMess.unauthorized(res, '', 'User is not exists!');
      }
    } catch (err) {
      responseMess.unauthorized(res, '', err.message);
    }
  },
};

module.exports = jwtController;

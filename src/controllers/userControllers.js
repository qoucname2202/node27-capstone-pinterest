const responseMess = require('../config/response');
const moment = require('moment');
const config = require('../config');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Joi = require('joi');
const crypto = require('crypto');
const { createPasswordChangedToken, sendMail } = require('../util');
const { generateToken, generateRefreshToken, checkRefreshToken, checkAccessToken } = require('../middlewares/jwt');
const ValidateMessage = require('../exceptions/ValidateMessage');

const userControllers = {
  refreshToken: async (req, res) => {
    try {
      const cookie = req.cookies;
      if (!cookie || !cookie.refreshToken) {
        return responseMess.badRequest(res, '', 'No refresh token in cookies!');
      } else {
        const userSchema = checkRefreshToken(cookie.refreshToken);
        let { user_id, email, name } = userSchema;
        let result = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (result) {
          const newAccessToken = generateToken(result);
          const newRefreshToken = generateRefreshToken(result);
          // Save refresh token to database
          await prisma.user.update({
            where: {
              email: email,
            },
            data: {
              refresh_token: newRefreshToken,
            },
          });
          res.cookie(config.refreshTokenName, newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
          return responseMess.success(res, { user_id, name, email, newAccessToken }, 'Refresh token successfully!');
        } else {
          return responseMess.badRequest(res, '', 'Refresh token not matched!');
        }
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  testToken: async (req, res) => {
    try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
        const { authorization } = req.headers;
        let newToken = authorization.replace('Bearer ', '');
        let user = checkAccessToken(newToken);
        if (user) {
          let { user_id, name, email, isAdmin, iat, exp } = user;
          let infoToken = {
            user_id,
            email,
            name,
            isAdmin,
            iat: moment(iat * 1000).format(),
            exp: moment(exp * 1000).format(),
          };
          return responseMess.success(res, infoToken, 'Successfully!');
        }
      } else {
        return responseMess.badRequest(res, '', 'Required Authentication!');
      }
    } catch (err) {
      responseMess.unauthorized(res, '', err.message);
    }
  },
  forgotPassword: async (req, res) => {
    try {
      let { email } = req.query;
      // Validation email using query params
      const schema = Joi.object({
        email: Joi.string().email().required().messages({
          'string.empty': ValidateMessage.ERROR_EMAIL.EMPTY,
          'string.email': ValidateMessage.ERROR_EMAIL.EMAIL_FORMAT,
        }),
      });
      let { error, value } = schema.validate({ email }, { stripUnknown: true, abortEarly: false });
      if (!error) {
        const userInfo = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (userInfo) {
          const resetToken = createPasswordChangedToken();
          const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
          const passwordResetExpires = moment(Date.now() + 15 * 60 * 1000).format();
          await prisma.user.update({
            where: {
              email: email,
            },
            data: {
              password_reset_token: passwordResetToken,
              password_reset_expires: passwordResetExpires,
            },
          });
          const html = `Please click on the link below to change your password. This link will expire 15 minutes. <a href=${config.urlServer}/api/v1/users/reset-password/${resetToken}>Click here</a>`;
          const content = { email, html };
          const result = await sendMail(content);
          if (result) {
            return responseMess.success(res, result, 'Send mail change password successfully!');
          }
        } else {
          return responseMess.notFound(res, '', 'User does not exist!');
        }
      } else {
        return responseMess.badRequest(res, '', error.details[0].message);
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  resetPassword: async (req, res) => {
    try {
      responseMess.success(res, 'Reset Password', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  getAllUser: async (req, res) => {
    try {
      responseMess.success(res, 'Get all user', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  getProfile: async (req, res) => {
    try {
      responseMess.success(res, 'Get user profile', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  savedImage: async (req, res) => {
    try {
      responseMess.success(res, 'Save images', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },

  getImagesUserCreate: async (req, res) => {
    try {
      responseMess.success(res, 'Get images user create', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  getImagesUserSaved: async (req, res) => {
    try {
      responseMess.success(res, 'Get images user saved', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  updateProfile: async (req, res) => {
    try {
      responseMess.success(res, 'Update profile', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  searchUser: async (req, res) => {
    try {
      responseMess.success(res, 'Search user', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  uploadAvatar: async (req, res) => {
    try {
      responseMess.success(res, 'Upload avatar', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  getFollower: async (req, res) => {
    try {
      responseMess.success(res, 'Get follower', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  searchFollower: async (req, res) => {
    try {
      responseMess.success(res, 'Search follower', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  getFollowee: async (req, res) => {
    try {
      responseMess.success(res, 'Get all followee', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  searchFollowee: async (req, res) => {
    try {
      responseMess.success(res, 'Search followee', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
};

module.exports = userControllers;

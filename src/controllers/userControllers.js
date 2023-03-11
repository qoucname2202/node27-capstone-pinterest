const responseMess = require('../config/response');
const moment = require('moment');
const config = require('../config');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateToken, generateRefreshToken, checkRefreshToken } = require('../middlewares/jwt');

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
  forgotPassword: async (req, res) => {
    try {
      responseMess.success(res, 'Forgot password', 'Successfully!');
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

const responseMess = require('../config/response');
const moment = require('moment');
const config = require('../config');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const validators = require('../validators');
const Joi = require('joi');
const crypto = require('crypto');
const { format } = require('date-fns');
const {
  createPasswordChangedToken,
  sendMail,
  hashPassword,
  getInfoFollower,
  getInfoFollowee,
  getImageUserSave,
} = require('../util');
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
      let { error } = schema.validate({ email }, { stripUnknown: true, abortEarly: false });
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
    let { error, value } = await validators.resetPassword(req.body);
    if (!error) {
      let { token } = value;
      const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
      const userInfo = await prisma.user.findFirst({
        where: {
          password_reset_token: passwordResetToken,
        },
      });
      if (userInfo) {
        let { email } = userInfo;
        let result = await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            password: hashPassword(value.password),
            password_reset_token: null,
            password_reset_expires: null,
            password_change_at: moment().format(),
          },
        });
        if (result) {
          return responseMess.success(res, '', 'Change password successfully!');
        } else {
          return responseMess.badRequest(res, '', 'Something went wrong!');
        }
      } else {
        return responseMess.notFound(res, '', 'Invalid reset token!');
      }
    } else {
      return responseMess.badRequest(res, '', error.details[0].message);
    }
  },
  getAllUser: async (req, res) => {
    try {
      let result = await prisma.user.findMany({
        select: {
          user_id: true,
          email: true,
          name: true,
          age: true,
          avatar: true,
        },
      });
      if (result) {
        return responseMess.success(res, result, 'Successfully!');
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  getProfile: async (req, res) => {
    try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
        const { authorization } = req.headers;
        let newToken = authorization.replace('Bearer ', '');
        let userSchema = checkAccessToken(newToken);
        if (userSchema) {
          let { user_id } = userSchema;
          const result = await prisma.user.findUnique({
            where: {
              user_id: user_id,
            },
            select: {
              user_id: true,
              email: true,
              name: true,
              age: true,
              avatar: true,
              created_at: true,
              updated_at: true,
            },
          });
          return responseMess.success(res, result, 'Successfully!');
        }
      } else {
        return responseMess.badRequest(res, '', 'Required Authentication!');
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  searchUser: async (req, res) => {
    try {
      let { keyword } = req.query;
      let nameFormat = keyword.trim().toLowerCase();
      let result = await prisma.user.findMany({
        where: {
          name: {
            contains: nameFormat,
          },
        },
        select: {
          user_id: true,
          email: true,
          name: true,
          age: true,
          avatar: true,
          created_at: true,
          updated_at: true,
        },
      });
      if (result) {
        return responseMess.success(res, result, 'Successfully!');
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  updateProfile: async (req, res) => {
    try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
        const { authorization } = req.headers;
        let newToken = authorization.replace('Bearer ', '');
        let userSchema = checkAccessToken(newToken);
        if (userSchema) {
          let { user_id } = userSchema;
          let { error } = await validators.updateUserValidate(req.body);
          if (!error) {
            let date_update = format(new Date(), 'yyyy-MM-dd\tHH:mm:ss').split('\t').join(' ');
            const result = await prisma.user.update({
              where: {
                user_id: user_id,
              },
              data: {
                ...req.body,
                updated_at: date_update,
              },
              select: {
                user_id: true,
                email: true,
                name: true,
                age: true,
                created_at: true,
                updated_at: true,
              },
            });
            return responseMess.success(res, result, 'Update user successfully!');
          } else {
            return responseMess.badRequest(res, '', error.details[0].message);
          }
        }
      } else {
        return responseMess.badRequest(res, '', 'User does not exists!');
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  getUserById: async (req, res) => {
    try {
      let { user_id } = req.query;
      const result = await prisma.user.findUnique({
        where: {
          user_id: Number(user_id),
        },
        select: {
          user_id: true,
          email: true,
          name: true,
          age: true,
          avatar: true,
          isAdmin: true,
          created_at: true,
          updated_at: true,
        },
      });
      if (result) {
        return responseMess.success(res, result, 'Successfully!');
      } else {
        return responseMess.notFound(res, '', 'User does not exists!');
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  followUser: async (req, res) => {
    try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
        const { authorization } = req.headers;
        let newToken = authorization.replace('Bearer ', '');
        let userSchema = checkAccessToken(newToken);
        if (userSchema) {
          let { user_id } = userSchema;
          if (Number(user_id) !== Number(req.query.user_id)) {
            const userTofollow = await prisma.user.findUnique({
              where: {
                user_id: Number(req.query.user_id),
              },
            });
            if (!userTofollow) {
              return responseMess.badRequest(res, '', 'User does not exists!');
            } else {
              const checkUserFollow = await prisma.follows.findMany({
                where: {
                  follower_id: Number(user_id),
                  followee_id: Number(req.query.user_id),
                },
              });
              if (checkUserFollow.length === 0) {
                let result = await prisma.follows.createMany({
                  data: {
                    follower_id: Number(user_id),
                    followee_id: Number(req.query.user_id),
                    created_at: format(new Date(), 'yyyy-MM-dd\tHH:mm:ss').split('\t').join(' '),
                  },
                });
                if (result) {
                  return responseMess.success(
                    res,
                    {
                      follower_id: Number(user_id),
                      followee_id: Number(req.query.user_id),
                    },
                    'User has been followed!',
                  );
                }
              } else {
                return responseMess.badRequest(res, '', 'You already follow this user!');
              }
            }
          } else {
            return responseMess.badRequest(res, '', 'You can not follow yourself!');
          }
        }
      } else {
        return responseMess.badRequest(res, '', 'Required Authentication!');
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  unfollowUser: async (req, res) => {
    try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
        const { authorization } = req.headers;
        let newToken = authorization.replace('Bearer ', '');
        let userSchema = checkAccessToken(newToken);
        if (userSchema) {
          let { user_id } = userSchema;
          if (Number(user_id) !== Number(req.query.user_id)) {
            const userTofollow = await prisma.user.findUnique({
              where: {
                user_id: Number(req.query.user_id),
              },
            });
            if (!userTofollow) {
              return responseMess.badRequest(res, '', 'User does not exists!');
            } else {
              const checkUserFollow = await prisma.follows.findMany({
                where: {
                  follower_id: Number(user_id),
                  followee_id: Number(req.query.user_id),
                },
              });
              if (checkUserFollow.length !== 0) {
                let result = await prisma.follows.deleteMany({
                  where: {
                    follower_id: Number(user_id),
                    followee_id: Number(req.query.user_id),
                  },
                });
                if (result) {
                  return responseMess.success(res, '', 'User has been unfollowed!');
                }
              } else {
                return responseMess.badRequest(res, '', 'You don not follow this user!');
              }
            }
          } else {
            return responseMess.badRequest(res, '', 'You can not unfollow yourself!');
          }
        }
      } else {
        return responseMess.badRequest(res, '', 'Required Authentication!');
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  getFollower: async (req, res) => {
    try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
        const { authorization } = req.headers;
        let newToken = authorization.replace('Bearer ', '');
        let userSchema = checkAccessToken(newToken);
        if (userSchema) {
          let { user_id } = userSchema;
          let result = await prisma.follows.findMany({
            where: {
              followee_id: Number(user_id),
            },
            include: {
              user_follows_follower_idTouser: true,
            },
          });
          if (result) {
            const userFormat = getInfoFollower(result);
            return responseMess.success(res, userFormat, 'Successfully!');
          }
        }
      } else {
        return responseMess.badRequest(res, '', 'Required Authentication!');
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  getFollowee: async (req, res) => {
    try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
        const { authorization } = req.headers;
        let newToken = authorization.replace('Bearer ', '');
        let userSchema = checkAccessToken(newToken);
        if (userSchema) {
          let { user_id } = userSchema;
          let result = await prisma.follows.findMany({
            where: {
              follower_id: Number(user_id),
            },
            include: {
              user_follows_followee_idTouser: true,
            },
          });
          if (result) {
            const userFormat = getInfoFollowee(result);
            return responseMess.success(res, userFormat, 'Successfully!');
          }
        }
      } else {
        return responseMess.badRequest(res, '', 'Required Authentication!');
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  getImagesUserCreate: async (req, res) => {
    try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
        const { authorization } = req.headers;
        let newToken = authorization.replace('Bearer ', '');
        let userSchema = checkAccessToken(newToken);
        if (userSchema) {
          let { user_id } = userSchema;
          let userExist = await prisma.user.findUnique({
            where: {
              user_id: user_id,
            },
          });
          if (userExist) {
            let result = await prisma.image.findMany({
              where: {
                user_id: user_id,
              },
              select: {
                image_id: true,
                image_name: true,
                url: true,
                description: true,
                created_at: true,
              },
            });
            if (result) {
              return responseMess.success(res, result, 'Successfully!');
            }
          } else {
            return responseMess.badRequest(
              res,
              {
                user_id,
              },
              'User does not exists!',
            );
          }
        }
      } else {
        return responseMess.badRequest(res, '', 'Required Authentication!');
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },

  savedImage: async (req, res) => {
    try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
        const { authorization } = req.headers;
        let newToken = authorization.replace('Bearer ', '');
        let userSchema = checkAccessToken(newToken);
        if (userSchema) {
          let { user_id } = userSchema;
          let { image_id } = req.query;
          let { error } = await validators.numberValidate({ image_id: Number(image_id) });
          if (!error) {
            let imageExist = await prisma.image.findUnique({
              where: {
                image_id: Number(image_id),
              },
            });
            if (imageExist) {
              let saveImageExist = await prisma.save_image.findMany({
                where: {
                  user_id: user_id,
                  image_id: Number(image_id),
                },
              });
              if (saveImageExist.length === 0) {
                let imageSchema = {
                  user_id,
                  image_id: Number(image_id),
                  date_save: format(new Date(), 'yyyy-MM-dd\tHH:mm:ss').split('\t').join(' '),
                };
                let result = await prisma.save_image.create({ data: imageSchema });
                if (result) {
                  return responseMess.success(res, imageSchema, 'Save image successfully!');
                }
              } else {
                return responseMess.badRequest(res, '', 'User has already save image!');
              }
            } else {
              return responseMess.badRequest(res, '', 'Image does not exists!');
            }
          } else {
            return responseMess.badRequest(res, '', error.details[0].message);
          }
        } else {
          return responseMess.badRequest(res, '', 'User does not exists!');
        }
      } else {
        return responseMess.badRequest(res, '', 'Required Authentication!');
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },

  getImagesUserSaved: async (req, res) => {
    try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
        const { authorization } = req.headers;
        let newToken = authorization.replace('Bearer ', '');
        let userSchema = checkAccessToken(newToken);
        if (userSchema) {
          let { user_id } = userSchema;
          let userExist = await prisma.user.findUnique({
            where: {
              user_id: user_id,
            },
          });
          if (userExist) {
            let result = await prisma.save_image.findMany({
              where: {
                user_id: user_id,
              },
              include: {
                image: true,
              },
            });
            if (result) {
              let imageSave = getImageUserSave(result);
              return responseMess.success(res, imageSave, 'Successfully!');
            }
          } else {
            return responseMess.badRequest(
              res,
              {
                user_id,
              },
              'User does not exists!',
            );
          }
        }
      } else {
        return responseMess.badRequest(res, '', 'Required Authentication!');
      }
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
};

module.exports = userControllers;

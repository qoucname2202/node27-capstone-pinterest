const responseMess = require('../config/response');
const moment = require('moment');
const validators = require('../validators');
const { hashPassword, isCorrectPassword } = require('../util');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { generateToken, generateRefreshToken } = require('../middlewares/jwt');

const authControllers = {
  signin: async (req, res) => {
    try {
      let { error, value } = await validators.signinValidate(req.body);
      if (!error) {
        let userSchema = await prisma.user.findUnique({
          where: {
            email: value.email,
          },
        });
        if (userSchema) {
          let { password } = value;
          let checkPass = isCorrectPassword(password, userSchema.password);
          if (checkPass) {
            const accessToken = generateToken(userSchema);
            const newRefreshToken = generateRefreshToken(userSchema);
            // Save refresh token to database
            await prisma.user.update({
              where: {
                email: value.email,
              },
              data: {
                refresh_token: newRefreshToken,
              },
            });
            // Save refresh token to cookies
            res.cookie('refreshToken', newRefreshToken, {
              httpOnly: true,
              secure: false,
              path: '/',
              sameSite: 'strict',
              maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            const { user_id, name, email } = userSchema;
            return responseMess.success(res, { user_id, name, email, accessToken }, 'Signin successfully!');
          } else {
            responseMess.badRequest(
              res,
              {
                email: value.email,
                password: value.password,
              },
              'Email or password is incorrect!',
            );
            return;
          }
        } else {
          responseMess.badRequest(
            res,
            {
              email: value.email,
              password: value.password,
            },
            'Email or password is incorrect!',
          );
          return;
        }
      } else {
        responseMess.badRequest(res, '', error.details[0].message);
        return;
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error!');
    }
  },
  signup: async (req, res) => {
    try {
      let { error, value } = await validators.signupValidate(req.body);
      if (!error) {
        let checkEmail = await prisma.user.findUnique({
          where: {
            email: value.email,
          },
        });
        if (!checkEmail) {
          let user = { ...value, password: hashPassword(value.password) };
          let result = await prisma.user.create({ data: user });
          if (result) {
            responseMess.success(res, 'Successfully', 'Signup successfully!');
          }
        } else {
          responseMess.conflict(
            res,
            {
              email: value.email,
            },
            'Email already exists',
          );
          return;
        }
      } else {
        responseMess.badRequest(res, '', error.details[0].message);
        return;
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error!');
    }
  },

  signout: async (req, res) => {
    try {
      responseMess.success(res, 'Hello Signout', 'Signout successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
};

module.exports = authControllers;

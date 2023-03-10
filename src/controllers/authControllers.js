const responseMess = require('../config/response');
const moment = require('moment');
const validators = require('../validators');
const { hashPassword } = require('../util');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authControllers = {
  signin: async (req, res) => {
    try {
      let { error, value } = await validators.signinValidate(req.body);
      if (!error) {
      } else {
        responseMess.badRequest(res, '', error.details[0].message);
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

const responseMess = require('../config/response');
const moment = require('moment');
const config = require('../config');
const validators = require('../validators');

const authControllers = {
  signin: async (req, res) => {
    try {
      let { error, value } = await validators.signinValidate(req.body);
      if (!error) {
        console.log(value);
      } else {
        responseMess.badRequest(res, '', error.details[0].message);
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error!');
    }
  },
  signup: async (req, res) => {
    try {
      responseMess.success(res, 'Hello Signup', 'Signup successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
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

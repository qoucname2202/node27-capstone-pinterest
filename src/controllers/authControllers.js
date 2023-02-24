const responseMess = require('../config/response');
const moment = require('moment');
const config = require('../config');

const authControllers = {
  signin: async (req, res) => {
    try {
      responseMess.success(res, 'Hello SignIn', 'Signin successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
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

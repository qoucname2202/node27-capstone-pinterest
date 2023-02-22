const responseMess = require('../config/response');
const moment = require('moment');
const config = require('../config');

const userControllers = {
  getAllUser: async (req, res) => {
    try {
      responseMess.success(res, '', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
};

module.exports = userControllers;

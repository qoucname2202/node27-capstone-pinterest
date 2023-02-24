const responseMess = require('../config/response');
const moment = require('moment');
const config = require('../config');

const commentControllers = {
  getCommentByImageId: async (req, res) => {
    try {
      responseMess.success(res, 'Get comment by image id', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  insertComment: async (req, res) => {
    try {
      responseMess.success(res, 'Insert comment', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  updateComment: async (req, res) => {
    try {
      responseMess.success(res, 'Updated commnent', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  deleteComment: async (req, res) => {
    try {
      responseMess.success(res, 'Deleted comment by id', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
};

module.exports = commentControllers;

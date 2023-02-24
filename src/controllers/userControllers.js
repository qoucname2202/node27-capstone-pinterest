const responseMess = require('../config/response');
const moment = require('moment');
const config = require('../config');

const userControllers = {
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
  changePassword: async (req, res) => {
    try {
      responseMess.success(res, 'Change-Password', 'Successfully!');
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
      responseMess.success(res, 'Upload avatar', 'Successfully!');
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

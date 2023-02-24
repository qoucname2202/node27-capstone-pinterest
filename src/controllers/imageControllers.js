const responseMess = require('../config/response');
const moment = require('moment');
const config = require('../config');

const imageControllers = {
  getAllImages: async (req, res) => {
    try {
      responseMess.success(res, 'Get all images', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  getImageById: async (req, res) => {
    try {
      responseMess.success(res, 'Get image by id', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  searchImage: async (req, res) => {
    try {
      responseMess.success(res, 'Search image', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  checkSaveImage: async (req, res) => {
    try {
      responseMess.success(res, 'Check save image', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  deleteImage: async (req, res) => {
    try {
      responseMess.success(res, 'Deleted image', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  uploadImage: async (req, res) => {
    try {
      responseMess.success(res, 'Upload image', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  createImageByUser: async (req, res) => {
    try {
      responseMess.success(res, 'Create image by user', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
};

module.exports = imageControllers;

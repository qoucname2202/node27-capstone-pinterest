const responseMess = require('../config/response');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { format } = require('date-fns');
const validators = require('../validators');
const { checkAccessToken } = require('../middlewares/jwt');

const imageControllers = {
  getAllImages: async (req, res) => {
    try {
      let ressult = await prisma.image.findMany();
      if (ressult) {
        responseMess.success(res, ressult, 'Successfully!');
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  getImageById: async (req, res) => {
    try {
      let { image_id } = req.query;
      const result = await prisma.image.findUnique({
        where: {
          image_id: Number(image_id),
        },
      });
      if (result) {
        return responseMess.success(res, result, 'Successfully!');
      } else {
        return responseMess.notFound(res, '', 'Image does not exists!');
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  searchImage: async (req, res) => {
    try {
      let { keyword } = req.query;
      let imageNameFormat = keyword.trim().toLowerCase();
      let result = await prisma.image.findMany({
        where: {
          image_name: {
            contains: imageNameFormat,
          },
        },
      });
      if (result) {
        return responseMess.success(res, result, 'Successfully!');
      }
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

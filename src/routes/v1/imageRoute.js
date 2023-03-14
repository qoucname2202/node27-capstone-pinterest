const express = require('express');
const imageControllers = require('../../controllers/imageControllers');
const imageRoute = express.Router();

imageRoute.get('/', imageControllers.getAllImages);
imageRoute.get('/getImageById', imageControllers.getImageById);
imageRoute.get('/search', imageControllers.searchImage);
imageRoute.get('/is-saved', imageControllers.checkSaveImage);
imageRoute.get('/delete', imageControllers.deleteImage);
imageRoute.get('/upload', imageControllers.uploadImage);
imageRoute.get('/create', imageControllers.createImageByUser);

module.exports = imageRoute;

const express = require('express');
const imageControllers = require('../../controllers/imageControllers');
const imageRoute = express.Router();

imageRoute.get('/', imageControllers.getAllImages);
imageRoute.get('/getImageById', imageControllers.getImageById);
imageRoute.get('/search', imageControllers.searchImage);
imageRoute.delete('/delete', imageControllers.deleteImage);
imageRoute.get('/is-saved', imageControllers.checkSaveImage);
imageRoute.get('/upload', imageControllers.uploadImage);
imageRoute.get('/create', imageControllers.createImageByUser);

module.exports = imageRoute;

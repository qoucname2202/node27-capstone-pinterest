const express = require('express');
const userControllers = require('../../controllers/userControllers');
const userRoute = express.Router();

userRoute.get('/getAllUser', userControllers.getAllUser);

module.exports = userRoute;

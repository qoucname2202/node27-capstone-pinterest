const express = require('express');
const rootRoute = express.Router();
const userRoute = require('./v1/userRoute');

rootRoute.use('/v1/user', userRoute);

module.exports = rootRoute;

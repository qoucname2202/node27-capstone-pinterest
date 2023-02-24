const express = require('express');
const authRoute = require('./v1/authRoute');
const commentRoute = require('./v1/commentRoute');
const imageRoute = require('./v1/imageRoute');
const rootRoute = express.Router();
const userRoute = require('./v1/userRoute');

rootRoute.use('/v1/auth', authRoute);
rootRoute.use('/v1/users', userRoute);
rootRoute.use('/v1/comments', commentRoute);
rootRoute.use('/v1/images', imageRoute);

module.exports = rootRoute;

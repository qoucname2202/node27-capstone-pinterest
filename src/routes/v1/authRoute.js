const express = require('express');
const authControllers = require('../../controllers/authControllers');
const authRoute = express.Router();

authRoute.post('/signup', authControllers.signup);
authRoute.post('/signin', authControllers.signin);
authRoute.post('/signout', authControllers.signout);

module.exports = authRoute;

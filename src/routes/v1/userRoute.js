const express = require('express');
const userControllers = require('../../controllers/userControllers');
const { verifyToken, authAdmin } = require('../../middlewares/jwt');
const userRoute = express.Router();

userRoute.get('/', authAdmin, userControllers.getAllUser);
userRoute.get('/profile', verifyToken, userControllers.getProfile);
userRoute.get('/search', authAdmin, userControllers.searchUser);
userRoute.post('/refresh-token', userControllers.refreshToken);
userRoute.post('/test-token', userControllers.testToken);
userRoute.get('/forgot-password', userControllers.forgotPassword);
userRoute.put('/reset-password', userControllers.resetPassword);
userRoute.get('/save', userControllers.savedImage);
userRoute.get('/images', userControllers.getImagesUserCreate);
userRoute.get('/saved-images', userControllers.getImagesUserSaved);
userRoute.get('/update', userControllers.getImagesUserSaved);

userRoute.get('/upload-avatar', userControllers.uploadAvatar);
userRoute.get('/follower', userControllers.getFollower);
userRoute.get('/search-follower', userControllers.searchFollower);
userRoute.get('/followee', userControllers.getFollowee);
userRoute.get('/search-followee', userControllers.searchFollowee);

module.exports = userRoute;

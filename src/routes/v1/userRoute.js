const express = require('express');
const userControllers = require('../../controllers/userControllers');
const userRoute = express.Router();

userRoute.get('/', userControllers.getAllUser);
userRoute.get('/profile', userControllers.getProfile);
userRoute.get('/save', userControllers.savedImage);
userRoute.post('/refresh-token', userControllers.refreshToken);
userRoute.post('/test-token', userControllers.testToken);
userRoute.get('/forgot-password', userControllers.forgotPassword);
userRoute.put('/reset-password', userControllers.resetPassword);
userRoute.get('/images', userControllers.getImagesUserCreate);
userRoute.get('/saved-images', userControllers.getImagesUserSaved);
userRoute.get('/update', userControllers.getImagesUserSaved);
userRoute.get('/search', userControllers.searchUser);
userRoute.get('/upload-avatar', userControllers.uploadAvatar);
userRoute.get('/follower', userControllers.getFollower);
userRoute.get('/search-follower', userControllers.searchFollower);
userRoute.get('/followee', userControllers.getFollowee);
userRoute.get('/search-followee', userControllers.searchFollowee);

module.exports = userRoute;

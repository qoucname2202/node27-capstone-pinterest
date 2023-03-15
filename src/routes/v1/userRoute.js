const express = require('express');
const userControllers = require('../../controllers/userControllers');
const { verifyToken, authAdmin } = require('../../middlewares/jwt');
const userRoute = express.Router();

userRoute.get('/', authAdmin, userControllers.getAllUser);
userRoute.get('/getUserById', authAdmin, userControllers.getUserById);
userRoute.get('/profile', verifyToken, userControllers.getProfile);
userRoute.get('/search', authAdmin, userControllers.searchUser);
userRoute.put('/update', verifyToken, userControllers.updateProfile);
userRoute.post('/refresh-token', userControllers.refreshToken);
userRoute.post('/test-token', userControllers.testToken);
userRoute.get('/forgot-password', userControllers.forgotPassword);
userRoute.put('/reset-password', userControllers.resetPassword);
userRoute.post('/save-image', verifyToken, userControllers.savedImage);
userRoute.get('/images', verifyToken, userControllers.getImagesUserCreate);
userRoute.get('/saves', verifyToken, userControllers.getImagesUserSaved);
userRoute.post('/upload-avatar', userControllers.uploadAvatar);

userRoute.post('/follow', verifyToken, userControllers.followUser);
userRoute.post('/unfollow', verifyToken, userControllers.unfollowUser);
userRoute.get('/follower', verifyToken, userControllers.getFollower);
userRoute.get('/followee', verifyToken, userControllers.getFollowee);

module.exports = userRoute;

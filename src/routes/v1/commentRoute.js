const express = require('express');
const commentControllers = require('../../controllers/commnetControllers');
const commentRoute = express.Router();

commentRoute.get('/:id', commentControllers.getCommentByImageId);
commentRoute.get('/insertComment', commentControllers.insertComment);
commentRoute.get('/updateComment', commentControllers.updateComment);
commentRoute.get('/deleteComment/:id', commentControllers.deleteComment);

module.exports = commentRoute;

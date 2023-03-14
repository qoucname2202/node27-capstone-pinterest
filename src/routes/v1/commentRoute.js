const express = require('express');
const commentControllers = require('../../controllers/commentControllers');
const { verifyToken } = require('../../middlewares/jwt');
const commentRoute = express.Router();

commentRoute.get('/getAll', verifyToken, commentControllers.getCommentByImageId);
commentRoute.post('/insert', verifyToken, commentControllers.insertComment);
commentRoute.put('/update', verifyToken, commentControllers.updateComment);
commentRoute.delete('/delete', verifyToken, commentControllers.deleteComment);

module.exports = commentRoute;

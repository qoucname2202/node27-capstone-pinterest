const responseMess = require('../config/response');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { format } = require('date-fns');
const validators = require('../validators');
const { checkAccessToken } = require('../middlewares/jwt');

const commentControllers = {
  getCommentByImageId: async (req, res) => {
    try {
      responseMess.success(res, 'Get comment by imageID', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  insertComment: async (req, res) => {
    try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
        const { authorization } = req.headers;
        let newToken = authorization.replace('Bearer ', '');
        let userSchema = checkAccessToken(newToken);
        if (userSchema) {
          let { user_id } = userSchema;
          let { image_id } = req.body;
          let imageExist = await prisma.image.findUnique({
            where: {
              image_id: image_id,
            },
          });
          if (imageExist) {
            let { error, value } = await validators.commentValidate(req.body);
            if (!error) {
              let { image_id, content } = value;
              let commentInfo = {
                user_id,
                image_id,
                content,
                comment_star: 0,
                date_comment: format(new Date(), 'yyyy-MM-dd\tHH:mm:ss').split('\t').join(' '),
              };
              let result = await prisma.comment.create({ data: commentInfo });
              if (result) {
                return responseMess.created(res, result, 'Comment image successfully!');
              }
            } else {
              return responseMess.badRequest(res, '', error.details[0].message);
            }
          } else {
            return responseMess.badRequest(res, '', 'Image does not exists!');
          }
        } else {
          return responseMess.badRequest(res, '', 'User does not exists!');
        }
      } else {
        return responseMess.badRequest(res, '', 'Required Authentication!');
      }
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  updateComment: async (req, res) => {
    try {
      responseMess.success(res, 'Updated commnent', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
  deleteComment: async (req, res) => {
    try {
      responseMess.success(res, 'Deleted comment by id', 'Successfully!');
    } catch (err) {
      responseMess.error(res, 'Internal Server Error');
    }
  },
};

module.exports = commentControllers;

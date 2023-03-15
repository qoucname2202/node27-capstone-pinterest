const Joi = require('joi');
const { passwordRegex } = require('../constants/global');
const ValidateMessage = require('../exceptions/ValidateMessage');
const validators = {
  signinValidate: (data) => {
    const userSchema = Joi.object({
      email: Joi.string().email().required().messages({
        'string.empty': ValidateMessage.ERROR_EMAIL.EMPTY,
        'string.email': ValidateMessage.ERROR_EMAIL.EMAIL_FORMAT,
      }),
      password: Joi.string().min(8).pattern(passwordRegex).required().messages({
        'string.empty': ValidateMessage.ERROR_PASSWORD.EMPTY,
        'string.min': ValidateMessage.ERROR_PASSWORD.LENGTH,
        'string.pattern.base': ValidateMessage.ERROR_PASSWORD.PATTERN,
      }),
    });
    return userSchema.validate(data, { stripUnknown: true, abortEarly: false });
  },
  signupValidate: (data) => {
    const userSchema = Joi.object({
      email: Joi.string().email().required().messages({
        'string.empty': ValidateMessage.ERROR_EMAIL.EMPTY,
        'string.email': ValidateMessage.ERROR_EMAIL.EMAIL_FORMAT,
      }),
      password: Joi.string().min(8).pattern(passwordRegex).required().messages({
        'string.empty': ValidateMessage.ERROR_PASSWORD.EMPTY,
        'string.min': ValidateMessage.ERROR_PASSWORD.LENGTH,
        'string.pattern.base': ValidateMessage.ERROR_PASSWORD.PATTERN,
      }),
      name: Joi.string().min(3).max(30).required().messages({
        'string.empty': ValidateMessage.ERROR_NAME.EMPTY,
        'string.min': ValidateMessage.ERROR_NAME.MIN_LENGTH,
        'string.max': ValidateMessage.ERROR_NAME.MAX_LENGTH,
        'string.base': ValidateMessage.ERROR_NAME.NAME_FORMAT,
      }),
      age: Joi.number().integer().required().messages({
        'number.empty': ValidateMessage.ERROR_AGE.EMPTY,
        'number.base': ValidateMessage.ERROR_AGE.AGE_FORMAT,
      }),
    });
    return userSchema.validate(data, { stripUnknown: true, abortEarly: false });
  },
  resetPassword: (data) => {
    const userSchema = Joi.object({
      password: Joi.string().min(8).pattern(passwordRegex).required().messages({
        'string.empty': ValidateMessage.ERROR_PASSWORD.EMPTY,
        'string.min': ValidateMessage.ERROR_PASSWORD.LENGTH,
        'string.pattern.base': ValidateMessage.ERROR_PASSWORD.PATTERN,
      }),
      token: Joi.string().min(3).max(250).required().messages({
        'string.empty': ValidateMessage.ERROR_TOKEN.EMPTY,
        'string.min': ValidateMessage.ERROR_TOKEN.MIN_LENGTH,
        'string.max': ValidateMessage.ERROR_TOKEN.MAX_LENGTH,
        'string.base': ValidateMessage.ERROR_TOKEN.NAME_FORMAT,
      }),
    });
    return userSchema.validate(data, { stripUnknown: true, abortEarly: false });
  },
  updateUserValidate: (data) => {
    const userSchema = Joi.object({
      name: Joi.string().min(3).max(30).required().messages({
        'string.empty': ValidateMessage.ERROR_NAME.EMPTY,
        'string.min': ValidateMessage.ERROR_NAME.MIN_LENGTH,
        'string.max': ValidateMessage.ERROR_NAME.MAX_LENGTH,
        'string.base': ValidateMessage.ERROR_NAME.NAME_FORMAT,
      }),
      age: Joi.number().integer().required().messages({
        'number.empty': ValidateMessage.ERROR_AGE.EMPTY,
        'number.base': ValidateMessage.ERROR_AGE.AGE_FORMAT,
      }),
    });
    return userSchema.validate(data, { stripUnknown: true, abortEarly: false });
  },
  commentValidate: (data) => {
    const commentSchema = Joi.object({
      image_id: Joi.number().integer().required().messages({
        'number.empty': ValidateMessage.ERROR_ID_NUMB.EMPTY,
        'number.base': ValidateMessage.ERROR_ID_NUMB.NUMB_FORMAT,
      }),
      content: Joi.string().min(3).required().messages({
        'string.empty': ValidateMessage.ERROR_CONTENT.EMPTY,
        'string.min': ValidateMessage.ERROR_CONTENT.MIN_LENGTH,
        'string.base': ValidateMessage.ERROR_CONTENT.NAME_FORMAT,
      }),
    });
    return commentSchema.validate(data, { stripUnknown: true, abortEarly: false });
  },
  contentValidate: (data) => {
    const commentSchema = Joi.object({
      content: Joi.string().min(3).required().messages({
        'string.empty': ValidateMessage.ERROR_CONTENT.EMPTY,
        'string.min': ValidateMessage.ERROR_CONTENT.MIN_LENGTH,
        'string.base': ValidateMessage.ERROR_CONTENT.NAME_FORMAT,
      }),
      comment_star: Joi.number().integer().min(1).max(5).required().messages({
        'number.empty': ValidateMessage.ERROR_STAR_COMMENT.EMPTY,
        'number.base': ValidateMessage.ERROR_STAR_COMMENT.STAR_FORMAT,
        'number.min': ValidateMessage.ERROR_STAR_COMMENT.MIN_LENGTH,
        'number.max': ValidateMessage.ERROR_STAR_COMMENT.MAX_LENGTH,
      }),
    });
    return commentSchema.validate(data, { stripUnknown: true, abortEarly: false });
  },
  numberValidate: (data) => {
    const numberSchema = Joi.object({
      image_id: Joi.number().integer().required().messages({
        'number.empty': ValidateMessage.ERROR_ID_NUMB.EMPTY,
        'number.base': ValidateMessage.ERROR_ID_NUMB.NUMB_FORMAT,
      }),
    });
    return numberSchema.validate(data, { stripUnknown: true, abortEarly: false });
  },
  imageValidate: (data) => {
    const imageSchema = Joi.object({});
    return imageSchema.validate(data, { stripUnknown: true, abortEarly: false });
  },
};

module.exports = validators;

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
  commentValidate: (data) => {
    const commentSchema = Joi.object({});
    return commentSchema.validateAsync(data, { stripUnknown: true, abortEarly: false });
  },
  imageValidate: (data) => {
    const imageSchema = Joi.object({});
    return imageSchema.validateAsync(data, { stripUnknown: true, abortEarly: false });
  },
};

module.exports = validators;
//   'string.max': ValidateMessage.ERROR_TOKEN.MAX_LENGTH,

const Joi = require('joi');
const { passwordRegex } = require('../constants/global');
const ValidateMessage = require('../exceptions/ValidateMessage');
const validators = {
  signinValidate: (data) => {
    const userSchema = Joi.object({
      email: Joi.string().email().required().label('email').messages({
        'string.empty': ValidateMessage.ERROR_EMAIL.EMPTY,
        'string.email': ValidateMessage.ERROR_EMAIL.EMAIL_FORMAT,
      }),
      password: Joi.string().min(8).pattern(passwordRegex).label('password').required().messages({
        'string.empty': ValidateMessage.ERROR_PASSWORD.EMPTY,
        'string.min': ValidateMessage.ERROR_PASSWORD.LENGTH,
        // Strong password
        'string.pattern.base': ValidateMessage.ERROR_PASSWORD.PATTERN,
      }),
    });
    return userSchema.validate(data, { stripUnknown: true, abortEarly: false });
  },
  signupValidate: (data) => {
    const userSchema = Joi.object({});
    return userSchema.validateAsync(data, { stripUnknown: true, abortEarly: false });
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

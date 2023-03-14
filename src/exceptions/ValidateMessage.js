const ValidateMessage = {
  ERROR_PASSWORD: {
    PATTERN: 'Password must contain at least 1 number, 1 uppercase & 1 special character @$!%*#?&',
    LENGTH: 'The length of the parameter should be more than 8 character',
    EMPTY: 'Password cannot be an empty field',
  },
  ERROR_EMAIL: {
    EMAIL_FORMAT: 'Please enter a valid email address.',
    EMPTY: 'Email cannot be an empty field',
  },
  ERROR_AGE: {
    AGE_FORMAT: 'Age must be a number',
    EMPTY: 'Age cannot be an empty field',
  },
  ERROR_ID_NUMB: {
    NUMB_FORMAT: 'Invalid field must be a number',
    EMPTY: 'Please can not be an empty field',
  },
  ERROR_NAME: {
    EMPTY: 'Name cannot be an empty field',
    MIN_LENGTH: 'The length of the parameter should be more than 3 character',
    MAX_LENGTH: 'The length of the parameter must be a string with a maximum 30',
    NAME_FORMAT: 'Name must be a string',
  },
  ERROR_TOKEN: {
    EMPTY: 'Token cannot be an empty field',
    MIN_LENGTH: 'The length of token should be more than 3 character',
    MAX_LENGTH: 'The length of token must be a string with a maximum 250',
    NAME_FORMAT: 'Token must be a string',
  },
};

module.exports = ValidateMessage;

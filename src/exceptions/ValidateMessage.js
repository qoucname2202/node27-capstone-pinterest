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
};

module.exports = ValidateMessage;

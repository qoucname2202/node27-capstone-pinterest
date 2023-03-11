require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  secretToken: process.env.JWT_SECRET,
  refreshToken: process.env.JWT_REFRESH_KEY,
  hashRounds: process.env.SALT_OR_ROUNDS,
  expriesToken: process.env.JWT_EXPIRES_IN,
  expriesRefreshToken: process.env.JWT_REFRESH_EXPIRES_IN,
  refreshTokenName: process.env.SECRET_COOKIE_NAME,
  emailAppPassword: process.env.EMAIL_APP_PASSWORD,
  emailName: process.env.EMAIL_NAME,
  urlServer: process.env.SERBER_URL,
};

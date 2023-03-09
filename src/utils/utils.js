const responseMess = require('../config/response');

// generate token
const generateToken = (data) => {};
// check token
const checkToken = () => {};
//  verify token
const verifyToken = (req, res, next) => {};
// verify token and admin
const authAdmin = async (req, res, next) => {};
// send mail
module.exports = {
  handelError,
  generateToken,
  checkToken,
  verifyToken,
  authAdmin,
};

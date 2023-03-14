const bcrypt = require('bcrypt');
const crypto = require('crypto');
const moment = require('moment');
const { format } = require('date-fns');
const nodemailer = require('nodemailer');
const { emailAppPassword, emailName } = require('../config');
const { hashRounds } = require('../config/index');

const hashPassword = (password) => {
  const newPassword = bcrypt.hashSync(password, Number(hashRounds));
  return newPassword;
};

const isCorrectPassword = (password, hashPassword) => {
  let checkPassword = bcrypt.compareSync(password, hashPassword);
  return checkPassword;
};

const createPasswordChangedToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  return resetToken;
};

const getInfoFollower = (userList) => {
  if (userList.length > 0) {
    let newUserList = [];
    userList.forEach((userItem) => {
      let { follower_id, created_at, user_follows_follower_idTouser } = userItem;
      let { user_id, name, email, age, avatar } = user_follows_follower_idTouser;
      let newUserFollow = {
        follower_id,
        userInfo: {
          user_id,
          email,
          name,
          age,
          avatar,
        },
        created_at,
      };
      newUserList.push(newUserFollow);
    });
    return newUserList;
  }
  return [];
};

const getInfoFollowee = (userList) => {
  if (userList.length > 0) {
    let newUserList = [];
    userList.forEach((userItem) => {
      let { followee_id, created_at, user_follows_followee_idTouser } = userItem;
      let { user_id, name, email, age, avatar } = user_follows_followee_idTouser;
      let newUserFollow = {
        followee_id,
        userInfo: {
          user_id,
          email,
          name,
          age,
          avatar,
        },
        created_at,
      };
      newUserList.push(newUserFollow);
    });
    return newUserList;
  }
  return [];
};

const sendMail = async ({ email, html }) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: emailName,
      pass: emailAppPassword,
    },
  });
  let info = await transporter.sendMail({
    from: '"Cybersoft" <no-relply@cybersoft.com>',
    to: email,
    subject: 'Forgot password',
    html: html,
  });

  return info;
};

module.exports = {
  hashPassword,
  isCorrectPassword,
  createPasswordChangedToken,
  sendMail,
  getInfoFollower,
  getInfoFollowee,
};

const moment = require('moment');
const HttpStatusCode = require('../exceptions/HttpStatusCode');
const responseMess = {
  success: (res, data, message) => {
    res.status(HttpStatusCode.OK).json({
      statusCode: HttpStatusCode.OK,
      message,
      content: data,
      dateTime: moment().format(),
    });
  },
  created: (res, data, message) => {
    res.status(HttpStatusCode.CREATED).json({
      statusCode: HttpStatusCode.CREATED,
      message,
      content: data,
      dateTime: moment().format(),
    });
  },
  noContent: (res, data, message) => {
    res.status(HttpStatusCode.NO_CONTENT).json({
      statusCode: HttpStatusCode.NO_CONTENT,
      message,
      content: data,
      dateTime: moment().format(),
    });
  },
  badRequest: (res, data, message) => {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      statusCode: HttpStatusCode.BAD_REQUEST,
      message,
      content: data,
      dateTime: moment().format(),
    });
  },
  unauthorized: (res, data, message) => {
    res.status(HttpStatusCode.UN_AUTHORIZED).json({
      statusCode: HttpStatusCode.UN_AUTHORIZED,
      message,
      content: data,
      dateTime: moment().format(),
    });
  },
  forbindden: (res, data, message) => {
    res.status(HttpStatusCode.FORBIDDEN).json({
      statusCode: HttpStatusCode.FORBIDDEN,
      message,
      content: data,
      dateTime: moment().format(),
    });
  },
  notFound: (res, data, message) => {
    res.status(HttpStatusCode.NOT_FOUND).json({
      statusCode: HttpStatusCode.NOT_FOUND,
      message,
      content: data,
      dateTime: moment().format(),
    });
  },
  noAcceptable: (res, data, message) => {
    res.status(HttpStatusCode.NO_ACCEPTABLE).json({
      statusCode: HttpStatusCode.NO_ACCEPTABLE,
      message,
      content: data,
      dateTime: moment().format(),
    });
  },
  conflict: (res, data, message) => {
    res.status(HttpStatusCode.CONFLICT).json({
      statusCode: HttpStatusCode.CONFLICT,
      message,
      content: data,
      dateTime: moment().format(),
    });
  },
  error: (res, message) => {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message,
      dateTime: moment().format(),
    });
  },
};
module.exports = responseMess;

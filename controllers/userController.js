const path = require('path');

const Location = require(path.join(__dirname, "..\\models\\locations"));
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.list = (req, res, next) => {
  res.send("User list: not implemented")
}

exports.login = (req, res, next) => {
  res.send("Login: not implemented")
}

exports.create_get = (req, res, next) => {
  res.send("Not implemented!")
}

exports.create_post = (req, res, next) => {
  res.send("Not implemented!")
}

const path = require('path');

const Location = require(path.join(__dirname, "..\\models\\locations"));
const Thing = require(path.join(__dirname, "..\\models\\things"));
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.list = (req, res, next) => {
  res.status(404).send()
}

exports.detail = (req, res, next) => {
  res.status(404).send()
};

exports.create_get = (req, res, next) => {
  res.status(404).send()
}

exports.create_post = (req, res, next) => {
  res.status(404).send()
}

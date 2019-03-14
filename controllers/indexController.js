const path = require('path');

const User = require(path.join(__dirname, "..\\models\\users"));
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.index = (req, res) => {
  res.render('index', {title: "TITLE"})
}

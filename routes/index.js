const express = require('express');
const router = express.Router()
const path = require('path');

const index_controller = require(path.join(__dirname, "..\\controllers\\indexController"));
const object_controller = require(path.join(__dirname, "..\\controllers\\objectController"));

// GET home page.
router.get('/', index_controller.index);

module.exports = router;

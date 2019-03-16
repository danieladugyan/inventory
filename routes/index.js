const express = require('express');
const router = express.Router()
const path = require('path');

const index_controller = require(path.join(__dirname, "..\\controllers\\indexController"));
const location_controller = require(path.join(__dirname, "..\\controllers\\locationController"));
const user_controller = require(path.join(__dirname, "..\\controllers\\userController"));
const object_controller = require(path.join(__dirname, "..\\controllers\\objectController"));

// GET home page.
router.get('/', (req, res) => {
  res.redirect('/users')
});

// User routes
router.get('/login', user_controller.login)

router.get('/user/create', user_controller.create_get)
router.post('/user/create', user_controller.create_post)
router.get('/users', user_controller.list)

// Location routes
router.get('/location/create', location_controller.create_get)
router.post('/location/create', location_controller.create_post)
router.get('/location/:id', location_controller.detail)
router.get('/locations', location_controller.list)

module.exports = router;
const express = require('express');
const router = express.Router()
const path = require('path');

const location_controller = require(path.join(__dirname, "..\\controllers\\locationController"));
const user_controller = require(path.join(__dirname, "..\\controllers\\userController"));
const thing_controller = require(path.join(__dirname, "..\\controllers\\thingController"));

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

// Thing routes

router.get('/thing/create', thing_controller.create_get) // create GET
router.post('/thing/create', thing_controller.create_post) // create POST
router.get('/thing/:id/update', thing_controller.update_get) // update GET
router.post('/thing/:id/update', thing_controller.update_post) // update POST
router.get('/thing/:id', thing_controller.detail) // detail GET
router.get('/things', thing_controller.list) // list GET

module.exports = router;

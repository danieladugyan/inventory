const express = require('express');
const router = express.Router()
const path = require('path');

const location_controller = require("../controllers/locationController");
const user_controller = require("../controllers/userController");
const thing_controller = require("../controllers/thingController");

// GET home page.
router.get('/', (req, res) => {
  res.redirect('/locations')
});

// User routes
router.get('/login', user_controller.login)

router.get('/user/create', user_controller.create_get)
router.post('/user/create', user_controller.create_post)
router.get('/users', user_controller.list)

// Location routes
router.get('/location/create', location_controller.create_get) // create GET
router.post('/location/create', location_controller.create_post) // create POST
router.get('/location/:id/update', location_controller.update_get) // update GET
router.post('/location/:id/update', location_controller.update_post) // update POST
router.get('/location/:id', location_controller.detail) // detail GET
router.get('/locations', location_controller.list) // list GET

// Thing routes

router.get('/thing/create', thing_controller.create_get) // create GET
router.post('/thing/create', thing_controller.create_post) // create POST
router.get('/thing/:id/update', thing_controller.update_get) // update GET
router.post('/thing/:id/update', thing_controller.update_post) // update POST
router.get('/thing/:id', thing_controller.detail) // detail GET
router.get('/things', thing_controller.list) // list GET

module.exports = router;

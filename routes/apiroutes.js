const express = require('express');
const router = express.Router()
const api_controller = require(path.join("..", "controllers", "apiController"));

router.get('locations', api_controller.locations)

module.exports = router;

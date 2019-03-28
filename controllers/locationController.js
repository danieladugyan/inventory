const path = require('path');
const Location = require(path.join("..", "models", "locations"))
const Thing = require(path.join("..", "models", "things"))
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const qrcode = require('qrcode');

function errorHandling(error) {
  console.error(err);
  return res.status(500).send();
}

exports.list = async (req, res) => {
  try {
    let list_locations = await Location.find().sort([['type', 'ascending']]).exec();
    res.render('location_list', {title: 'Location List', location_list: list_locations});
  } catch (err) {
    errorHandling(err);
  }
}

exports.detail = async (req, res) => {
  try {
    let location = await Location.findById(req.params.id).populate("things").exec();
    if (location == null) {
      res.status(404).send('Location not found!');
    } else {
      let imgdata = await qrcode.toDataURL(location.qrcode, {errorCorrectionLevel: 'H'});
      res.render('location_detail', {location: location, location_locations: location.locations,
                                     location_things: location.things, qrdata: imgdata});
    }
  } catch (err) {
    errorHandling(err);
  }
}

exports.create_get = async (req, res) => {
  try {
    let things_list = await Thing.find({}).exec();
    res.render('location_form', {title: 'Create Location', things_list: things_list})
  } catch (err) {
    errorHandling(err);
  }
}

exports.create_post = [
  // Validate fields.
  body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified.'),
  body('type').isLength({ min: 1 }).trim().withMessage('Type must be specified.'),

  // Sanitize fields
  sanitizeBody('name').trim().escape(),
  sanitizeBody('type').trim().escape(),
  sanitizeBody('desc').trim().escape(),

  // Process request after validation and sanitization
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Handle errors
        let things_list = await Thing.find({}).exec();
        res.render('location_form', {title: "Create Location", location: req.body, things_list: things_list, errors: errors.array()});
      } else {
        // If there are no errors:
        let location = new Location(
          {
            name: req.body.name,
            type: req.body.type,
            desc: req.body.desc,
            things: req.body.things
          });
          await location.save();
          res.redirect("/locations")
      }
    } catch (err) {
      errorHandling(err);
    }
  }
]

exports.update_get = async (req, res) => {
  try {
    let location = await Location.findById(req.params.id).populate('things').exec();
    let things_list = await Thing.find({}).exec();
    res.render('location_form', {title: 'Update Location', things_list: things_list, location: location});
  } catch (err) {
    errorHandling(err);
  }
}

exports.update_post = [
  // Validate fields.
  body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified.'),
  body('type').isLength({ min: 1 }).trim().withMessage('Type must be specified.'),

  // Sanitize fields
  sanitizeBody('name').trim().escape(),
  sanitizeBody('type').trim().escape(),
  sanitizeBody('desc').trim().escape(),

  // Process request after validation and sanitization
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Handle errors
        let things_list = await Thing.find({}).exec();
        res.render('location_form', {title: "Create Location", location: req.body, things_list: things_list, errors: errors.array()});
      } else {
        // If there are no errors:
        await Location.updateOne({_id: req.params.id},
          {
            name: req.body.name,
            type: req.body.type,
            desc: req.body.desc,
            things: req.body.things
          });
        res.redirect('/locations');
      }
    } catch (err) {
      errorHandling(err);
    }
  }
]

exports.update_delete = (req, res, next) => {

};

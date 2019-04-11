const path = require('path');
const Location = require(path.join("..", "models", "locations"))
const Thing = require(path.join("..", "models", "things"))
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const qrcode = require('qrcode');

function errorHandling(error, res) {
  console.error(error);
  return res.status(500).send();
}

exports.list = async (req, res) => {
  try {
    let list_locations = await Location.find().sort([['type', 'ascending']]).exec();

    // Filter out locations that are stored in other locations
    let filterids = [];
    list_locations.forEach(location => filterids.push(location.locations));
    filterids = [].concat.apply([], filterids);
    list_locations = list_locations.filter(location => !filterids.includes(location._id.toString()));

    res.render('location_list', {title: 'Location List', location_list: list_locations});
  } catch (err) {
    errorHandling(err, res);
  }
}

exports.detail = async (req, res) => {
  try {
    let location = await Location.findById(req.params.id).populate("things").populate("locations").exec();
    if (location == null) {
      res.status(404).send('Location not found!');
    } else {
      let imgdata = await qrcode.toDataURL(location.qrcode, {errorCorrectionLevel: 'H'});
      res.render('location_detail', {location: location, location_locations: location.locations,
                                     location_things: location.things, qrdata: imgdata});
    }
  } catch (err) {
    errorHandling(err, res);
  }
}

exports.create_get = async (req, res) => {
  try {
    let things_list = await Thing.find({}).exec();
    let locations_list = await Location.find({}).exec();
    res.render('location_form', {title: 'Create Location', things_list: things_list, locations_list:locations_list})
  } catch (err) {
    errorHandling(err, res);
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
            things: req.body.things,
            locations: req.body.locations
          });
          await location.save();
          res.redirect("/locations")
      }
    } catch (err) {
      errorHandling(err, res);
    }
  }
]

exports.update_get = async (req, res) => {
  try {
    let location = await Location.findById(req.params.id).populate('things').populate('locations').exec();
    let things_list = await Thing.find({}).exec();
    let locations_list = await Location.find({}).exec();
    res.render('location_form', {title: 'Update Location', things_list: things_list, location: location, locations_list: locations_list});
  } catch (err) {
    errorHandling(err, res);
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
            things: req.body.things,
            locations: req.body.locations
          });
        res.redirect('/locations');
      }
    } catch (err) {
      errorHandling(err, res);
    }
  }
]

exports.delete_get = async (req, res) => {
  try {
    let container = await Location.findOne({'locations':req.params.id}); // find ref to deleted location
    if (container) {
      await container[0].locations.pull(req.params.id);
      await container[0].save();
    }
    await Location.findByIdAndDelete(req.params.id).exec();
    res.redirect('/locations');
  } catch (err) {
    errorHandling(err, res);
  }
};

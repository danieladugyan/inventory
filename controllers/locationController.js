const path = require('path');

const Location = require(path.join(__dirname, "..\\models\\locations"));
const Thing = require(path.join(__dirname, "..\\models\\things"));
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const qrcode = require('qrcode');

exports.list = (req, res, next) => {
  Location.find().sort([['type', 'ascending']]).exec((err, list_locations) => {
    if (err) {return next(err)}
    res.render('location_list', {title: 'Location List', location_list: list_locations})
  })
}

exports.detail = (req, res, next) => {
  let queries = ["location", "things"]
  Promise.all([
    () => Location.findById(req.params.id).exec(),
    () => Thing.find({'location': req.params.id}, 'name notes').exec()
  ].map(f => f())
  ).then(results => {
    results = Object.assign(...queries.map((k, i) => ({[k]: results[i]})));
    if (results.location == null) {
      let err = new Error('Location not found');
      err.status(404);
      return next(err);
    } else {
      let qrcodetext = results.location.qrcode;
      qrcode.toDataURL(qrcodetext, {errorCorrectionLevel: 'H'})
        .then(url => {
          res.render('location_detail', {location: results.location, location_locations: results.location.locations,
            location_things: results.location.things, qrdata: url});
        }).catch(err => {
          console.error(err)
        });
    }
  }
  ).catch(err =>
    next(err) // Error in API usage
  )
};

exports.create_get = (req, res, next) => {
  res.render('location_form', {title: 'Create Location'})
}

exports.create_post = [
  // Validate fields.
  body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified.')
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
  body('type').isLength({ min: 1 }).trim().withMessage('Type must be specified.')
    .isAlphanumeric().withMessage('Type has non-alphanumeric characters.'),

  // Sanitize fields
  sanitizeBody('name').trim().escape(),
  sanitizeBody('type').trim().escape(),
  sanitizeBody('desc').trim().escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Handle errors
      res.render('location_form', {title: "Create Location", location: req.body, errors: errors.array()});
      return;
    } else {
      // If there are no errors:
      let location = new Location(
        {
          name: req.body.name,
          type: req.body.type,
          desc: req.body.desc
        });
      location.save((err) => {
        if (err) {return next(err)}
        res.redirect("/")
      })
    }
  }
]

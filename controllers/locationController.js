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
  Location.findById(req.params.id).populate("things").exec()
  .then(location => {
    if (location == null) {
      let err = new Error('Location not found');
      err.status = 404;
      return next(err);
    } else {
      // Generate QR Code
      qrcode.toDataURL(location.qrcode, {errorCorrectionLevel: 'H'})
      .then(imgdata => {
        res.render('location_detail', {location: location, location_locations: location.locations,
                                       location_things: location.things, qrdata: imgdata});
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
  let queries = ["things", "locations"]
  Promise.all([
    () => Thing.find({}).exec(),
    () => Location.find({}).exec()
  ].map(f => f())
  ).then(results => {
    results = Object.assign(...queries.map((k, i) => ({[k]: results[i]})));
    res.render('location_form', {title: 'Create Location', things: results.things, locations: results.locations})
  }).catch(err =>
    next(err) // Error in API usage
  )
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
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Handle errors
      res.render('location_form', {title: "Create Location", location: req.body, errors: errors.array()});
      return;
    } else {
      // If there are no errors:
      let queries = []
      if (req.body.things) {
        if (typeof req.body.things === 'string') {
          queries.push(Thing.findOne({'name':req.body.things}).exec())
        } else {
          req.body.things.map(thing => {
            queries.push(Thing.findOne({'name':thing}).exec())
          })
        }
      }

      Promise.all(queries).then(results => {
        let resultids = [];
        results.forEach(result => resultids.push(result._id))
        let location = new Location(
          {
            name: req.body.name,
            type: req.body.type,
            desc: req.body.desc,
            things: resultids
          });
          location.save((err, location) => {
            if (err) {return next(err)}
            res.redirect("/locations")
          })
      }).catch(err => {
        next(err) // Error in API usage
      })
    }
  }
]

exports.update_get = (req, res, next) => {

};

exports.update_post = (req, res, next) => {

};

exports.update_delete = (req, res, next) => {

};

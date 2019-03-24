const Location = require("../models/locations");
const Thing = require("../models/things");
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const qrcode = require('qrcode');

exports.list = (req, res, next) => {
  Thing.find().sort([['name', 'ascending']]).exec((err, list_things) => {
    if (err) {return next(err)}
    res.render('thing_list', {title: 'Thing List', thing_list: list_things})
  })
}

exports.detail = (req, res, next) => {
  let queries = ["thing", "location"];
  Promise.all([
    () => Thing.findById(req.params.id).exec(),
    () => Location.find({'things':req.params.id})
  ].map(f => f())
  ).then(results => {
    results = Object.assign(...queries.map((k, i) => ({[k]: results[i]})));
    if (results.thing == null) {
      let err = new Error('Thing not found');
      err.status = 404;
      return next(err)
    } else {
      // Generate QR Code
      qrcode.toDataURL(results.thing.qrcode, {errorCorrectionLevel: 'H'})
        .then(url => {
          res.render('thing_detail', {thing: results.thing, location: results.location[0], qrdata: url});
        }).catch(err => {
          console.error(err)
        });
    }
  }
  ).catch(err => {
  next(err) // Error in API usage
  });
};

exports.create_get = (req, res, next) => {
  res.render('thing_form', {title: 'Create Thing'})
}

exports.create_post = [
  // Validate fields.
  body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified.'),
  body('date_of_purchase', 'Invalid date of purchase').optional({ checkFalsy: true }).isISO8601(),
  body('warranty_expires', 'Invalid warranty expiry date').optional({ checkFalsy: true }).isISO8601(),

  // Sanitize fields
  sanitizeBody('name').trim().escape(),
  sanitizeBody('price').trim().escape(),
  sanitizeBody('date_of_purchase').trim().escape().toDate(),
  sanitizeBody('warranty_expires').trim().escape().toDate(),
  sanitizeBody('receipt').trim().escape(),
  sanitizeBody('notes').trim().escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Handle errors
      return res.render('thing_form', {errors: errors.array(), thing: req.body})
    } else {
      // If there are no errors:
      let thing = new Thing(
        {
          name: req.body.name,
          price: req.body.price,
          date_of_purchase: req.body.date_of_purchase,
          warranty_expires: req.body.warranty_expires,
          receipt: req.body.receipt,
          notes: req.body.notes
        });
      thing.save((err) => {
        if (err) {return next(err)}
        res.redirect("/things")
      })
    }
  }
]

exports.update_get = (req, res, next) => {
  Thing.findById(req.params.id).exec().then(thing => {
    res.render('thing_form', {title: 'Update Thing', thing: thing})
  }).catch(err => next(err))
};

exports.update_post = [
  // Validate fields.
  body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified.'),
  body('date_of_purchase', 'Invalid date of purchase').optional({ checkFalsy: true }).isISO8601(),
  body('warranty_expires', 'Invalid warranty expiry date').optional({ checkFalsy: true }).isISO8601(),

  // Sanitize fields
  sanitizeBody('name').trim().escape(),
  sanitizeBody('price').trim().escape(),
  sanitizeBody('date_of_purchase').trim().escape().toDate(),
  sanitizeBody('warranty_expires').trim().escape().toDate(),
  sanitizeBody('receipt').trim().escape(),
  sanitizeBody('notes').trim().escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Handle errors
      return res.render('thing_form', {errors: errors.array(), thing: req.body})
    } else {
      // If there are no errors:
      Thing.updateOne({_id: req.params.id},
        {
          name: req.body.name,
          price: req.body.price,
          date_of_purchase: req.body.date_of_purchase,
          warranty_expires: req.body.warranty_expires,
          receipt: req.body.receipt,
          notes: req.body.notes
        }, (err) => {
          if (err) {return next(err)}
          res.redirect("/things")
        })
    }
  }
]

exports.delete_post = (req, res, next) => {

};

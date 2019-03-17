const path = require('path');

const Location = require(path.join(__dirname, "..\\models\\locations"));
const Thing = require(path.join(__dirname, "..\\models\\things"));
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
      let qrcodetext = results.thing.qrcode;
      qrcode.toDataURL(qrcodetext, {errorCorrectionLevel: 'H'})
        .then(url => {
          res.render('thing_detail', {thing: results.thing, location: results.location, qrdata: url});
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
  body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified.').isAlphanumeric().withMessage('Name has non-alphanumeric characters.'),

  // Sanitize fields
  sanitizeBody('name').trim().escape(),
  sanitizeBody('price').trim().escape(),
  sanitizeBody('date_of_purchase').trim().escape(),
  sanitizeBody('warranty_expires').trim().escape(),
  sanitizeBody('receipt').trim().escape(),
  sanitizeBody('notes').trim().escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Handle errors
      res.render('thing_form', {title: "Create Thing", thing: req.body, errors: errors.array()});
      return;
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

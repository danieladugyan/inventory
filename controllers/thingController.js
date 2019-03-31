const path = require('path');
const Location = require(path.join("..", "models", "locations"));
const Thing = require(path.join("..", "models", "things"));
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const qrcode = require('qrcode');

function errorHandling(error) {
  console.error(err);
  return res.status(500).send();
}

exports.list = async (req, res) => {
  try {
    let list_things = await Thing.find().sort([['name', 'ascending']]).exec();
    res.render('thing_list', {title: 'Thing List', thing_list: list_things});
  } catch (err) {
    errorHandling(err);
  }
}

exports.detail = async (req, res) => {
  try {
    let thing = await Thing.findById(req.params.id);
    let location = await Location.find({'things':req.params.id});
    if (thing == null) {
      res.status(404).send('Location not found!');
    } else {
        let imgdata = await qrcode.toDataURL(thing.qrcode, {errorCorrectionLevel: 'H'});
        res.render('thing_detail', {thing: thing, location: location[0], qrdata: imgdata});
    }
  } catch (err) {
    errorHandling(err);
  }
}

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
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Handle errors
        return res.render('thing_form', {errors: errors.array(), thing: req.body});
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
        await thing.save();
        res.redirect("/things")
      }
    } catch (err) {
      errorHandling(err);
    }
  }
]

exports.update_get = async (req, res) => {
  try {
    let thing = await Thing.findById(req.params.id).exec()
    res.render('thing_form', {title: 'Update Thing', thing: thing})
  } catch (err) {
    errorHandling(err);
  }
}

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
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Handle errors
        return res.render('thing_form', {errors: errors.array(), thing: req.body})
      } else {
        // If there are no errors:
        await Thing.updateOne({_id: req.params.id},
          {
            name: req.body.name,
            price: req.body.price,
            date_of_purchase: req.body.date_of_purchase,
            warranty_expires: req.body.warranty_expires,
            receipt: req.body.receipt,
            notes: req.body.notes
          })
        res.redirect("/things")
      }
    } catch (err) {
      errorHandling(err);
    }
  }
]

exports.delete_get = async (req, res) => {
  try {
    let container = await Location.find({'things':req.params.id}); // find ref to deleted location
    if (container) {
      await container[0].things.pull(req.params.id);
      await container[0].save();
    }
    await Thing.findByIdAndDelete(req.params.id).exec();
    res.redirect('/things');
  } catch (err) {
    errorHandling(err, res);
  }
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define location schema
let ThingSchema = new Schema({
  name: {type: String, required: true},
  image: {data: Buffer, contentType: String},
  warranty: Date,
  price: Number,
  lended: Boolean,
  notes: String
})

// Location detail link
ThingSchema.virtual('url').get(function() {
  return 'location/' + this._id
})

// Generate QR code
ThingSchema.virtual('qrcode').get(function() {
  let urlqr;
  qrcode.toDataURL(this._id, (err, url) => {
    if (err) throw err
    urlqr = url;
  })
  return urlqr;
})

module.exports = mongoose.model('Thing', ThingSchema);

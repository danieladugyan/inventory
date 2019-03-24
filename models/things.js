const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define location schema
let ThingSchema = new Schema({
  name: {type: String, required: true},
  image: {data: Buffer, contentType: String},
  date_of_purchase: Date,
  price: Number,
  warranty_expires: Date,
  lended: {type: Boolean, default: false},
  receipt: String,
  notes: String,
  things: [{type: Schema.Types.ObjectId, ref: 'Thing'}]
})

// Location detail link
ThingSchema.virtual('url').get(function() {
  return '/thing/' + this._id
})

// Generate QR code
ThingSchema.virtual('qrcode').get(function() {
  return this._id.toString()
})

module.exports = mongoose.model('Thing', ThingSchema);

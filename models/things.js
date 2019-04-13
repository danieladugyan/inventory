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
  notes: String
})

// Location detail link
ThingSchema.virtual('url').get(function() {
  return '/thing/' + this._id
})

// Create base64 data ready for HTML use
ThingSchema.virtual('imgdata').get(function() {
  let data = this.image.data;
  if (data) {
    return "data:image/png;base64," + data.toString("base64");
  } else {
    return "https://placehold.it/500x280";
  }
})

// Generate QR code
ThingSchema.virtual('qrcode').get(function() {
  return this._id.toString()
})

module.exports = mongoose.model('Thing', ThingSchema);

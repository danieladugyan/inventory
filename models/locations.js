const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define location schema
let LocationSchema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  desc: String,
  image: {data: Buffer, contentType: String},
  locations: [this],
  things: [{type: Schema.Types.ObjectId, ref: 'Thing'}]
})

//LocationSchema.set('toObject', { getters: true, virtuals: true }) USED FOR DEBUGGING IN CONSOLE

// Location detail link
LocationSchema.virtual('url').get(function() {
  return '/location/' + this._id
})

// Generate QR code
LocationSchema.virtual('qrcode').get(function() {
  return this._id.toString()
})

module.exports = mongoose.model('Location', LocationSchema);

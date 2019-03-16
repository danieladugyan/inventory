const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const qrcode = require('qrcode');

// Define location schema
let LocationSchema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  desc: String,
  locations: [this],
  things: [{type: Schema.Types.ObjectId, ref: 'Thing'}]
})

LocationSchema.set('toObject', { getters: true, virtuals: true })

// Location detail link
LocationSchema.virtual('url').get(function() {
  return 'location/' + this._id
})

// Generate QR code
LocationSchema.virtual('qrcode').get(function() {
  let urlqr;
  qrcode.toDataURL(this._id.toString(), (err, url) => {
    if (err) throw err
    urlqr = url;
  })
  return urlqr;
})

module.exports = mongoose.model('Location', LocationSchema);

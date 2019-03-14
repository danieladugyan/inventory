const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define location schema
let ObjectSchema = new Schema({
  name: {type: String, required: true},
  image: {data: Buffer, contentType: String},
  warranty: Date,
  price: Number,
  lended: Boolean,
  notes: String
})

// Generate QR code
/*ObjectSchema.virtual('qrcode').get(() => {
  return "somekindofqrcodegenerator"
})*/

module.exports = mongoose.model('Object', ObjectSchema);

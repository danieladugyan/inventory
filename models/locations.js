const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define location schema
let LocationSchema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  locations: [this],
  things: [{type: Schema.Types.ObjectId, ref: 'Object'}]
})

// Generate QR code
/*ObjectSchema.virtual('qrcode').get(() => {
  return "somekindofqrcodegenerator"
})*/

module.exports = mongoose.model('Location', LocationSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TrustSchema = new Schema({
  name: {
    type: String
  },
  price: {
    type: String
  },
  gstSlab :{
    type : Number
  },
  totalPrice:{
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Trust = mongoose.model('trust', TrustSchema);

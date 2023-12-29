// Import mongoose
const mongoose = require('mongoose');

// Create a schema
const receiptSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  receiptDate: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    default: 'Testing the receipt'
  },
  supplier: {
    type: String,
    default: 'Supplier test'
  },
  imageFileName: {
    type: String,
    default: 'image'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  Deleted: {
    type: Boolean,
    default: false
  }
});

const receipt = mongoose.model('Receipt',receiptSchema);
module.exports = receipt;

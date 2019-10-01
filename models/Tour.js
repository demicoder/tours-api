const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a name'],
    unique: true
  },
  price: {
    type: Number,
    required: [true, 'Tour price must be specified']
  },
  rating: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Tour', tourSchema);

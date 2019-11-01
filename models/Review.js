const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Review must belong to a user.'],
      ref: 'User'
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.']
    },
    rating: {
      type: Number,
      min: 0,
      max: 5
    },
    review: {
      type: String,
      required: [true, 'Review can not be empty']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

module.exports = mongoose.model('Review', reviewSchema);

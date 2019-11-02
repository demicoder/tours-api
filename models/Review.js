const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
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

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name photo'
  }).populate({
    path: 'tour',
    select: 'name photo'
  });

  next();
});

module.exports = mongoose.model('Review', reviewSchema);

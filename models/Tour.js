const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Tour must have a name'],
      unique: true
    },
    price: {
      type: Number,
      required: [true, 'Tour price must be specified']
    },
    duration: {
      type: Number,
      required: [true, 'Tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'Tour must have a difficulty level']
    },
    ratingAverage: {
      type: Number,
      default: 0
    },
    ratingQuantity: {
      type: Number,
      default: 0
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'Tour must have a summary']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'Tour must have a cover image']
    },
    images: [String],
    startDates: [Date]
  },
  {
    timestamps: true
  }
);

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;

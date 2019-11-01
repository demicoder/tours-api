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
      required: [true, 'Tour must have a group size'],
      min: [1, 'Tour must have at least one group size']
    },
    difficulty: {
      type: String,
      required: [true, 'Tour must have a difficulty level'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty level must be Easy, Medium or Difficulty'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [1, 'Tour average rating must not be less than 1'],
      max: [5, 'Tour average rating must not be more than 5']
    },
    ratingQuantity: {
      type: Number,
      default: 0
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          return this.price > val;
        },
        message: 'Discount must not be more than tour price'
      }
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'Tour must have a summary']
    },
    description: {
      type: String,
      trim: true,
      minlength: [20, 'Tour description must be in 20 or more characters']
    },
    imageCover: {
      type: String,
      required: [true, 'Tour must have a cover image']
    },
    images: [String],
    startDates: [Date],
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      description: String,
      address: String
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String
      }
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
);

// Don't select certain fields
tourSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt -updatedAt -createdAt'
  });

  next();
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;

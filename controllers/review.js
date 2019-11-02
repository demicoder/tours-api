const Review = require('./../models/Review');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./factoryHandler');

exports.addReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.params.tour) filter = { tour: req.params.tour };

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  });
});

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tour;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

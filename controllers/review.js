const Review = require('./../models/Review');

const catchAsync = require('./../utils/catchAsync');

exports.addReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tour;
  if (!req.body.user) req.body.user = req.user._id;

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    }
  });
});

exports.getReview = (req, res, next) => {
  res.status(500).json({
    status: 'fail',
    message: 'Route not ready yet'
  });
};

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  });
});

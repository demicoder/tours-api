const Review = require('./../models/Review');

const catchAsync = require('./../utils/catchAsync');

exports.addReview = catchAsync(async (req, res, next) => {
  const user = req.user;

  const { rating, review } = req.body;
  const tour = req.params.tour;

  const newReview = await Review.create({ user, tour, rating, review });

  res.status(201).json({
    status: 'success',
    review: newReview
  });
});

exports.getReview = (req, res, next) => {
  res.status(500).json({
    status: 'fail',
    message: 'Route not ready yet'
  });
};

exports.getAllReviews = (req, res, next) => {
  res.status(500).json({
    status: 'fail',
    message: 'Route not ready yet'
  });
};

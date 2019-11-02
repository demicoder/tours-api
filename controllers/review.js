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

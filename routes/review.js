const express = require('express');

const authController = require('./../controllers/auth');

const reviewController = require('../controllers/review');

const router = express.Router();

router
  .route('/:tour')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.addReview
  );

module.exports = router;

const express = require('express');

const authController = require('./../controllers/auth');

const reviewController = require('../controllers/review');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.addReview
  )
  .get(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.getAllReviews
  );

module.exports = router;

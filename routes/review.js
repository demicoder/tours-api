const express = require('express');

const authController = require('./../controllers/auth');

const reviewController = require('../controllers/review');

const router = express.Router();

router
  .route('/:tour')
  .get(authController.protect, reviewController.getAllReviews)
  .post(authController.protect, reviewController.addReview);

module.exports = router;

const express = require('express');

const authController = require('./../controllers/auth');

const reviewController = require('../controllers/review');

const router = express.Router({ mergeParams: true });

// Protected all routes after this middleware
router.use(authController.protect);

router
  .route('/')
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.addReview
  )
  .get(reviewController.getAllReviews);

router
  .route('/:id')
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;

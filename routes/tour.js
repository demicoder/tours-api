const express = require('express');

const router = express.Router();

const tourController = require('../controllers/tour');
const authController = require('../controllers/auth');
const reviewController = require('../controllers/review');

router
  .route('/top-5-cheapest')
  .get(tourController.aliasTopCheapest, tourController.getTours);

router
  .route('/')
  .get(authController.protect, tourController.getTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(authController.protect, tourController.getTour)
  .patch(authController.protect, tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

router
  .route('/:tour/reviews')
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.addReview
  );

module.exports = router;

const express = require('express');

const tourController = require('../controllers/tour');
const authController = require('../controllers/auth');

const router = express.Router();

const reviewRouter = require('./review');

router.use('/:tour/reviews', reviewRouter);

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

module.exports = router;

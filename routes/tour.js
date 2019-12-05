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
  .get(tourController.getTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;

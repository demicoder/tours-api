const express = require('express');

const router = express.Router();

const tourController = require('../controllers/tour');

router
  .route('/top-5-cheapest')
  .get(tourController.aliasTopCheapest, tourController.getTours);

router
  .route('/')
  .get(tourController.getTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;

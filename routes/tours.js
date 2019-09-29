const express = require('express');

const tourController = require('../controllers/tour');

const router = express.Router();

router
  .route('/api/v1/tours')
  .get(tourController.getTours)
  .post(tourController.createTour);

router
  .route('/api/v1/tours/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;

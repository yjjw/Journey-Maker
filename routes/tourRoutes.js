const express = require('express');
const tourController = require('./../controllers/tourController');

// Routes
const router = express.Router();

router.param('id', tourController.checkID);

router.param('/', tourController.checkBody);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody,tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .delete(tourController.deleteTour);

module.exports = router;
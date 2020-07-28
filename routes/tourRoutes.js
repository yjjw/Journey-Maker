const express = require('express');
const tourController = require('./../controllers/tourController');

// Routes
const router = express.Router();

//router.param('id', tourController.checkID);

//router.param('/', tourController.checkBody);

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .delete(tourController.deleteTour)
  .patch(tourController.updateTour);

module.exports = router;

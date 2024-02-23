const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourControllers'); // can also use destructuring
// const { getallTour, createTour } = require('./../controllers/tourControllers');

router
  .route('/')
  .get(tourController.getallTour)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;

const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourControllers'); // can also use destructuring
// const { getallTour, createTour } = require('./../controllers/tourControllers');
router.param(
  'id',
  //(req, res, next, val) => {
  //   next();

  tourController.checkId
);
router
  .route('/')
  .get(tourController.getallTour)
  .post(tourController.checkBody, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;

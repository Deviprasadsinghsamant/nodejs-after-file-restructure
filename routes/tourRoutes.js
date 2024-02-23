const express = require('express');
const fs = require('fs');

const router = express.Router();

tourRouter.route('/').get(getallTour).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;

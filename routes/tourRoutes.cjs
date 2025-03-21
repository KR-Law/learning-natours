'use strict';
const express = require('express');
const tourController = require('../controller/toursController.cjs');

const router = express.Router();

router.param('id', tourController.checkID);

// router.param('id', (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);
//   next();
// });

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;

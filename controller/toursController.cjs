'use strict';
// Required for Express type hinting in JSDoc
// eslint-disable-next-line no-unused-vars
const express = require('express');
const Tour = require('./../models/tourModels.cjs');

/**
 * Get a single Tour by id.
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

/**
 * Get a single Tour by id.
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // console.log(tour);
    // Tour.findOne({_id: req.param.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

/**
 * Get a single Tour by id.
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // const newTour.save()
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

/**
 * Get a single Tour by id.
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

/**
 * Get a single Tour by id.
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      data: err,
    });
  }
};

module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour };

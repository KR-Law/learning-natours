'use strict';
// Required for Express type hinting in JSDoc
// eslint-disable-next-line no-unused-vars
const express = require('express');
const Tour = require('./../models/tourModels.cjs');

const aliasTopTours = (req, res, next) => {
  console.log('Accessed aliasTopTours');
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

/**
 * Get a single Tour by id.
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    // Build Query
    // 1A) Filtering
    // Shallow copy so can modify. Then ignore fields that require special handling.
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

    // 1B) Advanced Query
    // Need this for MongoDB Operator.
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // gte, gt, lte, lt.
    let query = Tour.find(JSON.parse(queryStr));

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt _id');
    }

    // 3) Field Limiting - Selecting Specific fields called Projecting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    //page=2&limit=10, 1-20 page 1, 11-20, page 2 etc..

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }

    // Execute Query
    const tours = await query;

    // Send Response
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

module.exports = { aliasTopTours, getAllTours, getTour, createTour, updateTour, deleteTour };

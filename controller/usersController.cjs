'use strict';
// Required for Express type hinting in JSDoc
// eslint-disable-next-line no-unused-vars
const express = require('express');

function getAllUsers(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined!',
  });
}

function createUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined!',
  });
}
function getUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined!',
  });
}
function updateUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined!',
  });
}
function deleteUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined!',
  });
}

module.exports = { getAllUsers, createUser, getUser, updateUser, deleteUser };

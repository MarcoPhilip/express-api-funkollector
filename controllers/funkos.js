
const Funko = require('../models/funko');
const express = require('express');
const router = express.Router();

// Routes/controller funstions below

// CREATE - POST - /funkos
router.post('/', async (req, res) => {
  // Add a message to test the route
  res.json({ message: 'Create Route' });
});

// READ - GET - /funkos

// READ - GET - /funkos/:funkoId

// DELETE - DELETE - /funkos/:funkoId

// UPDATE - PUT - /funkos/:funkoId




// Export the router at the bottom of the file
module.exports = router
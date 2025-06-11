
const Funko = require('../models/funko');
const express = require('express');
const router = express.Router();

// Routes/controller funstions below

// CREATE - POST - /funkos
router.post('/', async (req, res) => {
  try {

    const createdFunko = await Funko.create(req.body);

    res.status(201).json(createdFunko);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ - GET - /funkos
router.get('/', async (req, res) => {
  try {

    const funkos = await Funko.find();

    res.status(200).json(funkos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ - GET - /funkos/:funkoId
router.get('/:funkoId', async (req, res) => {
  try {

    const funko = await Funko.findById(req.params.funkoId);
       
    // Handle error if pet not found
    if (!funko) {
      res.status(404);
      throw new Error('Funko not found.');
    }

    res.status(200).json(funko);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE - DELETE - /funkos/:funkoId
router.delete('/:funkoId', async (req, res) => {
  try {

    const deletedFunko = await Funko.findByIdAndDelete(req.params.funkoId);
    
    // Handle error if pet not found
    if(!deletedFunko) {
      return res.status(404).json({ error: 'Funko not found.' });
    }

    res.status(200).json(deletedFunko);
  } catch (err) {
    // Add error handling code for 404 errors
    if (res.statusCode === 404) {
    res.json({ err: err.message });
    } else {
    // Add else statement to handle all other errors
    res.status(500).json({ err: err.message });
    }
  }
});

// UPDATE - PUT - /funkos/:funkoId
router.put('/:funkoId', async (req, res) => {
  try {

    const updatedFunko = await Funko.findByIdAndUpdate(req.params.funkoId, req.body);

    // Add a check for a not found pet
    if (!updatedFunko) {
      res.status(404);
      throw new Error('Funko not found.');
    }

    // Add a JSON response with the updated funko
    res.status(200).json(updatedFunko);
  } catch (err) {
    // Add error handling code for 404 errors
    if (res.statusCode === 404) {
    res.json({ err: err.message });
    } else {
    // Add else statement to handle all other errors
    res.status(500).json({ err: err.message });
    }
  }
});


// Export the router at the bottom of the file
module.exports = router


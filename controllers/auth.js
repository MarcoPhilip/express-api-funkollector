// /controllers/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Collection = require('../models/collection');
const Wishlist = require('../models/wishlist')

// Add in constant for the number of rounds 
const saltRounds = 12;

router.post('/sign-up', async (req, res) => {
  try {
    // Check if the username is already taken
    const userInDatabase = await User.findOne({ username: req.body.username });

    if (userInDatabase) {
      return res.status(409).json({err:'Username already taken.'});
    }

    // Create a new user with hashed password
    const user = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      hashedPassword: bcrypt.hashSync(req.body.hashedPassword, saltRounds)
    });

    // Assign a Collection for the user
    await Collection.create({
      owner: user._id,
      funkos: [],
    });

    // Assign a Wishlist for the user
    await Wishlist.create({
      owner: user._id,
      funkos: [],
    });
    
    // Construct the payload
    const payload = { 
        username: user.username, 
        _id: user._id 
    };

    // Create the token, attaching the payload
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);

    // Send the token instead of the user
    res.status(201).json({ token });
  } catch (err) {
    // Send the error message to the client
    res.status(500).json({ err: err.message });
  }
});


router.post('/sign-in', async (req, res) => {
  try {

    // Look up the user by their username in the database
    const user = await User.findOne({ username: req.body.username });

    // If the user doesn't exist, return a 401 status code with a message
    if (!user) {
      return res.status(401).json({ err: 'Invalid credentials.' });
    };

    // Check if the password is correct using bcrypt
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.hashedPassword, user.hashedPassword
    );

    // If the password is incorrect, return a 401 status code with a message
    if (!isPasswordCorrect) {
      return res.status(401).json({ err: 'Invalid credentials.' });
    }

    // Construct the payload
    const payload = { 
        username: user.username, 
        _id: user._id 
    };

    // Create the token, attaching the payload
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);

    // Send the token instead of the user
    res.status(201).json({ token });

  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});




module.exports = router;

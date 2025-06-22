// controllers/users.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token');
const User = require('../models/user');
const Collection = require('../models/collection');
const Wishlist = require('../models/wishlist');

// GET - all users
router.get('/', verifyToken, async (req, res) => {
  try {
    // Get a list of all users, but return their names and id
    const users = await User.find({}, "firstname lastname _id");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});


// GET single user profile and their collection and wishlists
router.get('/:userId', verifyToken, async (req,res) => {
  try {
    // Find user by their by id using req.params
    const user = await User.findById(req.params.userId).select('firstname lastname _id');

    // Handle error if user not found
    if (!user) {
      return res.status(404).json({ err: 'User not found.' });
    }

    // Get the user's collection and wishlist
    const [collection, wishlist] = await Promise.all([
      // Find the user collection using the params and populate funkos
      Collection.findOne({ owner: req.params.userId }).populate('funkos'),
      // Find the user wishlist using the params and populate funkos
      Wishlist.findOne({ owner: req.params.userId }).populate('funkos'),
    ]);

    res.status(200).json({
      // Include the user profile, collection and wishlist in response
      user,
      collection: collection?.funkos || [],
      wishlist: wishlist?.funkos || [],
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});


module.exports = router;


const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist')
const Funko = require('../models/funko');
const verifyToken = require('../middleware/verify-token');

// READ - GET - /wishlists
router.get('/', verifyToken, async (req, res) => {
    try {

        const wishlist = await Wishlist.findOne({ owner: req.user._id }).populate('funkos');

        // Handle error if wishlist is not found
        if (!wishlist) {
            return res.status(404).json({ error: 'Wishlist not found.' });
        }

        res.status(200).json(wishlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE - POST - /funkos
router.post('/funkos', verifyToken, async (req, res) => {
    try {
        
        const wishlist = await Wishlist.findOne({ owner: req.user._id });

        // Handle error if collection not found
        if (!wishlist) {
            return res.status(404).json({ error: 'Wishlist not found.' });
        };

        const funko = await Funko.findById(req.body.funkoId);

        // Handle error if funko not found
        if (!funko) {
            return res.status(404).json({ error: 'Funko not found.' });
        };

        wishlist.funkos.push(funko.id);

        await wishlist.save();

        res.status(200).json(wishlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - DELETE - /funkos/:funkoId
router.delete('/funkos/:funkoId', verifyToken, async (req, res) => {
    try {

        const wishlist = await Wishlist.findOne({ owner: req.user._id });

        // Handle error if collection not found
        if (!wishlist) {
            return res.status(404).json({ error: 'Collection not found.' });
        };

        wishlist.funkos.pull(req.params.funkoId);

        await wishlist.save();

        res.status(200).json(wishlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
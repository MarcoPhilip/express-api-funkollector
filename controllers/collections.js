
const express = require('express');
const router = express.Router();
const Collection = require('../models/collection');
const Funko = require('../models/funko');
const verifyToken = require('../middleware/verify-token');

// READ - GET - /collections
router.get('/', verifyToken, async (req, res) => {
    try {

        const collection = await Collection.findOne({ owner: req.user._id }).populate('funkos');

        // Handle error if collection is not found
        if (!collection) {
            return res.status(404).json({ error: 'Collection not found.' });
        }

        res.status(200).json(collection);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE - POST - /collections
router.post('/funkos', verifyToken, async (req, res) => {
    try {
        
        const collection = await Collection.findOne({ owner: req.user._id });

        // Handle error if collection not found
        if (!collection) {
            return res.status(404).json({ error: 'Collection not found.' });
        };

        const funko = await Funko.findById(req.body.funkoId);

        // Handle error if funko not found
        if (!funko) {
            return res.status(404).json({ error: 'Funko not found.' });
        };

        collection.funkos.push(funko.id);

        await collection.save();

        res.status(200).json(collection);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE - DELETE - /collection/:funkoId
router.delete('/funkos/:funkoId', verifyToken, async (req, res) => {
    try {

        const collection = await Collection.findOne({ owner: req.user._id });

        // Handle error if collection not found
        if (!collection) {
            return res.status(404).json({ error: 'Collection not found.' });
        };

        collection.funkos.pull(req.params.funkoId);

        await collection.save();

        res.status(200).json(collection);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
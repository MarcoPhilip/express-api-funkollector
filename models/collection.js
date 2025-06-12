

const mongoose = require('mongoose');


const collectionSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    funkos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Funko'
        }
    ],
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
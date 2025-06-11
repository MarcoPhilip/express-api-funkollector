

const mongoose = require('mongoose');


const wishlistSchema = new mongoose.Schema({
    user: {
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

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
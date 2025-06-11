

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    }
});

// ... userSchema above
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
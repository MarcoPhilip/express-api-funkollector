const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

// Import the controller files below
const funkoRouter = require('./controllers/funkos');
// const collectionRouter = require('./controllers/collections');
// const wishlistRouter = require('./controllers/wishlists');
// const userRouter = require('./controllers/users');

// Auth controllers
const testJwtRouter = require('./controllers/test-jwt');
const authRouter = require('./controllers/auth');

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

//! Routes go here

// Public
app.use('/funkos', funkoRouter);
// app.use('/collections', collectionRouter);
// app.use('/wishlists', wishlistRouter);
// app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/test-jwt', testJwtRouter);


app.listen(3000, () => {
  console.log('The express app is ready!');
});

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const movieRoutes = require('./routes/movies');
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Odinaka-Joy:0O2DyJOVizD49UDI@cluster0-xjqvz.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.options("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content, Accept, Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use('/movie', movieRoutes);
app.use('/user', userRoutes);

module.exports = app;

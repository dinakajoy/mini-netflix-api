const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');
const movieRoutes = require('./routes/movies');
const userRoutes = require('./routes/user');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

mongoose.connect(`${process.env.DATABASE_URL}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to DB!');
  })
  .catch((error) => {
    console.log('Unable to connect to DB!');
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

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.status(200).json({
    success: 'YAY! Congratulations! Your Are Connected To Mini-Netflix Api. But, You Must Be Authorized To Continue!!!'
  });
});

app.use('/movie', movieRoutes);
app.use('/user', userRoutes);

app.use('*', (req, res) => {
  res.status(400).json({
    error: 'Welcome To Mini-Netflix Api. Please Ensure You Entered A Correct Route!!!'
  });
});

module.exports = app;

'use strict';

var express = require('express'), // call express
  app = express(), // define our app using express
  bodyParser = require('body-parser'),
  port = process.env.PORT || 8080, // set our port
  config = require('./config/db'),
  mongoose = require('mongoose'),
  db = mongoose.connect(config.url_local);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


//////////////////////////
// REGISTER OUR ROUTES  //
//////////////////////////

// all of our routes will be prefixed with /api
app.use('/api', require('./app/routes/'));
app.use('/', function (req, res) {
  res.send("Api at /api");
});
app.use(logErrors);
app.use(catchValidationErrors);
app.use(catchIdErrors);
app.use(catchDuplicateErrors);
app.use(catchAll);

//////////////////
// START SERVER //
//////////////////

app.listen(port);
console.log('Server listening on port ' + port);

///////////////////////
// HANDLER FUNCTIONS //
///////////////////////

function logErrors(err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  next(err);
}

function catchValidationErrors(err, req, res, next) {
  if (err && err.name === 'ValidationError') {
    return res.status(400).send(err);
  }
  next(err);
}

function catchIdErrors(err, req, res, next) {
  if (err && err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(404).send({
      error: 'Not found',
      message: 'Object with id ' + err.value + ' not found.'
    });
  }
  next(err);
}

function catchDuplicateErrors(err, req, res, next) {
  if (err && err.code === 11000) {
    return res.status(404).json({
      error: 'Duplicate record',
      message: 'The record cannot be saved due to a duplicate key error'
    });
  }
  next(err);
}

function catchAll(err, req, res, next) {
  res.status(500).send({
    error: 'Unknown error',
    message: err.message
  });
}


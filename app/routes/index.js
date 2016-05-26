'use strict';
// ROUTES FOR OUR API
// =============================================================================
var express = require('express'),
  router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
  res.json({
    message: 'Attendance Calendar API'
  });
});

router.use('/attendees', require('./attendees'));
router.use('/calendars', require('./calendars'));

module.exports = router;

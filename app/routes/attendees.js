'use strict';

var express = require('express'),
  router = express.Router(), // get an instance of the express Router
  // get models
  Attendee = require('../models/attendee'),
  crud = require('../common/crud');

router.route('/')
  .get(crud(Attendee).index)
  .post(function (req, res, next) {
    var attendee = new Attendee();

    attendee.name = req.body.name;

    attendee.save(function (err) {
      if (err) {
        return next(err);
      }
      res.status(201).json(attendee);
    });
  });

router.route('/:id')
  .get(crud(Attendee).show)
  .delete(crud(Attendee).delete)
  // update basic data
  .put(function (req, res, next) {
    Attendee.findById(req.params.id, function (err, attendee) {
      if (err) {
        return next(err);
      }

      attendee.name = req.body.name;
      // attendee.defaultAttendance = req.body.defaultAttendance;
      attendee.attendances = req.body.attendances;

      attendee.save(function (err) {
        if (err) {
          res.send(err);
          return;
        }
        res.json(attendee);
      });

    });
  });

module.exports = router;

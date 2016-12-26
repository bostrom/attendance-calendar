'use strict';

var express = require('express'),
  router = express.Router(), // get an instance of the express Router
  // get models
  Attendance = require('../models/attendance'),
  Attendee = require('../models/attendee'),
  Calendar = require('../models/calendar'),
  crud = require('../common/crud'),
  responseFormats = require('../common/responseFormats'),
  _ = require('lodash');

router.route('/')
  .get(crud(Attendance).index)
  .post(function (req, res, next) {
    var attendance = new Attendance();

    attendance.date = req.body.date;
    attendance.status = req.body.status;
    attendance.attendee = req.body.attendee;
    attendance.calendar = req.body.calendar;

    attendance.save(function (err) {
      if (err) {
        return next(err);
      }
      res.status(201).json(attendance);
    });
  });

router.route('/search')
  /**
   * Search for attendance objects using allowed query params.
   * @returns {Object} List of matching records
   */
  .get(function (req, res, next) {
    // pick only allowed query params
    var query = _.pick(req.query, Attendance.queryParams);

    Attendance.find(query, function (err, attendances) {
      if (err) {
        return next(err);
      }

      res.json(responseFormats.list(attendances));
    });
  });

router.route('/:id')
  /**
   * Find a single record.
   */
  .get(crud(Attendance).show)
  /**
   * Deletes a single record.
   */
  .delete(crud(Attendance).delete)
  /**
   * Update a single record.
   */
  .put(function (req, res, next) {
    Attendance.findById(req.params.id, function (err, attendance) {
      if (err) {
        return next(err);
      }

      attendance.status = req.body.status;

      attendance.save(function (err) {
        if (err) {
          res.send(err);
          return;
        }
        res.json(attendance);
      });

    });
  });

module.exports = router;

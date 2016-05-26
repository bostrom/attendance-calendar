'use strict';

var express = require('express'),
  router = express.Router(), // get an instance of the express Router
  // get models
  Calendar = require('../models/calendar'),
  crud = require('../common/crud');

router.route('/')
  .get(crud(Calendar).index)
  .post(function (req, res, next) {
    var calendar = new Calendar(req.body);

    calendar.save(function (err) {
      if (err) {
        return next(err);
      }
      res.status(201).json(calendar);
    });
  });

router.route('/:id')
  // .get(crud(Calendar).show)
  .get(function (req, res, next) {
    Calendar.findById(req.params.id, function (err, calendar) {
      if (err) {
        return next(err);
      }
      Calendar.populate(calendar, [{path: 'attendees'}], function (err, calendar) {
        res.json(calendar);
      });
    });
  })
  .delete(crud(Calendar).delete)
  // update basic data
  .put(function (req, res, next) {
    var id = req.params.id,
      data = req.body;

    delete data._id;

    Calendar.findByIdAndUpdate(id, data, {
      new: true
    }, function (err, calendar) {
      // if (err) {
      //   return next(err);
      // }

      // calendar.name = req.body.name;

      // calendar.save(function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.json(calendar);
      // });

    });
  });

module.exports = router;

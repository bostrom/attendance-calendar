'use strict';

var responseFormats = require('./responseFormats');

module.exports = function (Model) {

  return {
    index: function (req, res, next) {
      Model.find(function (err, models) {
        if (err) {
          return next(err);
        }
        res.json(responseFormats.list(models));
      });
    },
    // create: function (req, res, next) {
    //   var model = new Model();
    //   model.name = req.body.name;

    //   model.save(function (err) {
    //     if (err) {
    //       return next(err);
    //     }
    //     res.status(201).json(model);
    //   });
    // },
    show: function (req, res, next) {
      Model.findById(req.params.id, function (err, model) {
        if (err) {
          return next(err);
        }
        res.json(model);
      });
    },
    delete: function (req, res, next) {
      Model.remove({
        _id: req.params.id
      }, function (err, model) {
        if (err) {
          return next(err);
        }

        res.json({
          message: 'Successfully deleted'
        });
      });
    }
  };
};

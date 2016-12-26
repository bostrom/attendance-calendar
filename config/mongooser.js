'use strict';

var dbConfig = require('./db'),
  fs = require('fs'),
  path = require('path'),
  config = {
    // connect: dbConfig.db_uri
  };

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

fs.readdirSync(path.join(__dirname, '..', 'app', 'models')).forEach(function (name) {
  var filePath = path.join(__dirname, '..', 'app', 'models', name);
  var stat = fs.statSync(filePath);
  if (stat.isFile()) {
    var modelName = capitalizeFirstLetter(path.basename(filePath, '.js'));
    config[modelName] = require(filePath).schema;
  }
});

module.exports = config;

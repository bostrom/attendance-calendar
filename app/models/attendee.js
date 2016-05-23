/**
 * Attendee model schema.
 */
var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

var AttendeeShcema = new Schema({
  name: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Attendee', AttendeeShcema);

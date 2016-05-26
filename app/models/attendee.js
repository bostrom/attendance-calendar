/**
 * Attendee model schema.
 */
var mongoose = require('mongoose'),
 Schema = mongoose.Schema,
 Attendance = require('./attendance');

var AttendeeShcema = new Schema({
  name: {
    type: String,
    default: ''
  },
  attendances: [Attendance.schema]
});

module.exports = mongoose.model('Attendee', AttendeeShcema);

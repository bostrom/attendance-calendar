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
  defaultAttendance: {
    type: String,
    enum: 'absent present'.split(' ')
  }
});

module.exports = mongoose.model('Attendee', AttendeeShcema);

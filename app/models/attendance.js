'use strict';

/**
 * Attendance model schema.
 */
var mongoose = require('mongoose'),
 Schema = mongoose.Schema,
 Attendee = require('./attendee'),
 Calendar = require('./calendar');

var AttendanceSchema = new Schema({
  date: {
    type: Date,
    default: ''
  },
  status: {
    type: String,
    enum: 'absent present'.split(' ')
  },
  attendee: {
    type: Schema.Types.ObjectId, ref: 'Attendee'
  },
  calendar: {
    type: Schema.Types.ObjectId, ref: 'Calendar'
  }
});

// Allowed query parameters
AttendanceSchema.statics.queryParams = ['calendar', 'attendee'];

module.exports = mongoose.model('Attendance', AttendanceSchema);

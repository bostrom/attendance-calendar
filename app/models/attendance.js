/**
 * Attendance model schema.
 */
var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

var AttendanceSchema = new Schema({
  date: {
    type: Date,
    default: ''
  },
  status: {
    type: String,
    enum: 'absent present'.split(' ')
  }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);

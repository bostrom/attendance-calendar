/**
 * Calendar model schema.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CalendarShcema = new Schema({
  name: {
    type: String,
    required: true
  },
  attendees: [{
    type: Schema.Types.ObjectId,
    ref: 'Attendee'
  }]
});

module.exports = mongoose.model('Calendar', CalendarShcema);

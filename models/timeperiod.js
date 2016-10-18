var mongoose = require('mongoose');

var timePeriodSchema = new mongoose.Schema({
  user: String,
  start: Date,
  stop: Date
});


module.exports = mongoose.model('TimePeriod', timePeriodSchema);

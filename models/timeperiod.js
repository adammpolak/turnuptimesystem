var mongoose = require('mongoose');

var timePeriodSchema = new mongoose.Schema({
  userId: String,
  user: String,
  start: Date,
  stop: Date
});

module.exports = mongoose.model('timeperiod', timePeriodSchema);

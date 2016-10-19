var mongoose = require('mongoose');

var timeperiodSchema = new mongoose.Schema({
  user: String,
  start: Date,
  stop: Date
});

module.exports = mongoose.model('timeperiod', timeperiodSchema);

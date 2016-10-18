var mongoose = require('mongoose');

var timePeriodSchema = new mongoose.Schema({
  user: String,
  start: Date,
  stop: Date,
  toObject: { virtuals: true },
});

timePeriodSchema.virtual('subtotal').get(function(){
  return this.stop - this.start;
});

module.exports = mongoose.model('TimePeriod', timePeriodSchema);

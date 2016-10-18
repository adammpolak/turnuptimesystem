var mongoose = require('mongoose');

var timePeriodSchema = new mongoose.Schema({
  user: String,
  start: Date,
  stop: Date
});

<<<<<<< HEAD
// timePeriodSchema.virtual('subtotal').get(function(){
//   return this.stop - this.start;
// });
=======
>>>>>>> 841bccd06335875bad170cc42546eff3d44efc0d

module.exports = mongoose.model('TimePeriod', timePeriodSchema);

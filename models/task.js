var mongoose = require('mongoose');

var timePeriodSchema = require('./timePeriod').schema;

var taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  taskTimeList: [timePeriodSchema]
});

module.exports = mongoose.model('Task', taskSchema);

var mongoose = require('mongoose');

var timeperiodSchema = require('./timeperiod').schema;

var taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  taskTimeList: [timeperiodSchema]
});

module.exports = mongoose.model('Task', taskSchema);

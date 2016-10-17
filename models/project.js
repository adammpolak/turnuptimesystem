var mongoose = require('mongoose');

var taskSchema = require('./task').schema;

var projectSchema = new mongoose.Schema({
  projectName: String,
  projectDescription: String,
  taskList: [taskSchema]
});

module.exports = mongoose.model('Project', projectSchema);

var mongoose = require('mongoose');

var taskSchema = require('./task').schema;

var projectSchema = new mongoose.Schema({
  completed: Boolean,
  projectName: String,
  projectDescription: String,
  taskList: [taskSchema]
});

projectSchema.pre('save', function(next){
  this.completed = false
  next();
})

module.exports = mongoose.model('Project', projectSchema);

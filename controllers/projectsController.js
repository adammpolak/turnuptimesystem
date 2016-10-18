var express = require('express'),
    router  = express.Router();

var Project = require('../models/project');
var Task = require('../models/task');
var TimePeriod = require('../models/timePeriod');

// ROUTE :: GET --------------------------all projects
router.get('/', function(req, res){
  Project.find({}).exec()
  .then(function(allProjects){
    console.log(allProjects);
    res.json(allProjects);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: CREATE ------------------------one project
router.post('/', function(req, res){
  console.log("req.body", req.body.project);
  Project.create(req.body.project)
  .then(function(project){
    console.log(project);
    res.json(project);
  })
  .catch(function(err){
    console.log(err);
    res.status(400);
  })
});

// ROUTE :: GET ---------------------------one project
router.get('/:pId', function(req, res){
  Project.findById(req.params.pId).exec()
  .then(function(project){
    console.log(project);
    res.json(project);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: UPDATE ------------------------one project
router.put('/:pId', function(req, res){
  Project.findOneAndUpdate(req.params.pId, req.body)
  .then(function(project){
    console.log(project);
    res.json(project);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});


module.exports = router;

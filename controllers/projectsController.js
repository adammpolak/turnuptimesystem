var express = require('express'),
    router  = express.Router();

var Project = require('../models/project');
var Task = require('../models/task');
var TimePeriod = require('../models/timePeriod');

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

router.get('/:id', function(req, res){
  Project.findById(req.params.id).exec()
  .then(function(project){
    console.log(project);
    res.json(project);

router.get('/:pId', function(req, res){
  Order.findById(req.params.id).exec()
  .then(function(order){
    console.log(order);
    res.json(order);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

module.exports = router;

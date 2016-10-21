var express = require('express'),
    router  = express.Router();

var Project = require('../models/project');
var Task = require('../models/task');
var timeperiod = require('../models/timeperiod');

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
router.put('/project', function(req, res){
  Project.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
  .then(function(project){
    console.log(project);
    res.json(project);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

router.delete('/project/:id', function(req, res){
  console.log(req.params.id);
  Project.remove({_id: req.params.id})
  .then(function(project){
    console.log(project);
    res.json(project);
  })
  .catch(function(err) {
    console.log(err);
    res.status(500);
  })
});

// ROUTE :: GET --------------------------special Info
router.get('/ttt/:whom', function(req, res){
  Project.find({'taskList.taskTimeList.user' : req.params.whom}).exec()
  .then(function(someProjects){
    console.log("req.params.whom", req.params.whom)
    console.log(someProjects);
    var summary = {};
    var singleProjectArray = [];
    var singleTaskArray = [];
    //-----------------------------Calc start
    var sumUserTime = 0;
    for (var i=0; i<someProjects.length; i++) {
      var sumSingleProjectTime = 0;
      for (var j=0; j<someProjects[i].taskList.length; j++) {
        var sumSingleTaskTime = 0;
        var sumTaskTime = 0;
        for (var k=0; k<someProjects[i].taskList[j].taskTimeList.length; k++) {
          var value = 0;
          if (someProjects[i].taskList[j].taskTimeList[k].user === req.params.whom) {
            value = Math.floor((someProjects[i].taskList[j].taskTimeList[k].stop.getTime() - someProjects[i].taskList[j].taskTimeList[k].start.getTime())/1000);
            sumTaskTime += value;
          };
        };
        sumSingleTaskTime += sumTaskTime;
        singleTaskArray.push({taskName: someProjects[i].taskList[j].name, totalTask: sumSingleTaskTime});
        sumSingleProjectTime += sumSingleTaskTime;
      };
      singleProjectArray.push({projectName: someProjects[i].projectName, totalProject: sumSingleProjectTime, taskList: singleTaskArray});
      sumUserTime += sumSingleProjectTime;
      singleTaskArray = [];
    };
    summary = {user: req.params.whom, userTotal: sumUserTime, projectList: singleProjectArray};
    res.json(summary);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

module.exports = router;

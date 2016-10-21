(function(){
  angular.module('turnupApp')
  .controller('projectsController', projectsController);
  projectsController.$inject = ['$http', '$location', '$state', 'Flash', '$timeout'];

  function projectsController($http, $location, $state, Flash, $timeout) {
    var self = this;

    this.userStats = {};
    this.allProjects = [];
    this.completedprojects = [];
    this.activeProject = {};
    this.activeUserTaskStates = [];
    this.activeIndex = null;
    this.removeTask = function(index) {
      self.activeProject.taskList[index].splice(index, 1);
      self.updateActiveProject();
    }
    this.allProjectsTotalTime = [];
//update time for a certain task
    this.updateTaskTimePeriod = function(index){
      getUser();
      var now = new Date();
      //this checks if there is an outstanding timeperiod for the current user
      if (self.activeUserTaskStates[index].outstanding === true) {
        var timePeriodIndex = self.activeUserTaskStates[index].indexPosition;
        self.activeProject.taskList[index].taskTimeList[timePeriodIndex].stop = now;
        self.activeUserTaskStates[index] = {
          outstanding: false,
          indexPosition: null,
        };
        //this is run if this task has outstanding time state
      } else {
        //this is run if the task does not have outstanding time state
        var newTimePeriodObject = {
          userId: self.currentUser._id,
          user: self.currentUser.username,
          start: now,
          stop: null,
        }
        if (self.activeProject.taskList[index].taskTimeList) {
          self.activeProject.taskList[index].taskTimeList.push(newTimePeriodObject);
        } else {
          self.activeProject.taskList[index].taskTimeList = [newTimePeriodObject];
        }
        self.activeUserTaskStates[index] = {
          outstanding: true,
          indexPosition: self.activeProject.taskList[index].taskTimeList.length-1,
        }
      }
      //this will be the put route to update the new object with the information
      self.updateActiveProject();
    }

//active user
    // $http.get('/api/helpers/get-user')
    //   .then(function(response) {
    //     self.currentUser = response.data.user;
    //   })
    //   .catch(function(err){
    //     console.log('err', err)
    //   })

    function getUser(){
      $http.get('/api/helpers/get-user')
        .then(function(response) {
          self.currentUser = response.data.user;
        })
        .catch(function(err){
          console.log('err', err)
        })
    }

//updating a project status
    this.updateActiveProject = function () {
      $http.put(`/api/projects/project`, self.activeProject)
      .then(function(response){
      })
    }
    this.goToNewProject = function(){
      $location.path('/projects/project/new')
    }

//display a project
    this.displayThisProject = function(index) {
      getUser();
      $http.get('/api/projects')
      .then(function(response) {
        self.allProjects = response.data;
      self.activeUserTaskStates = [];
      self.activeProject = self.allProjects[index];
      self.activeIndex = index;
      for (var x = 0; x<self.activeProject.taskList.length; x++){
        var taskStatus = {
          outstanding: false,
          indexPosition: null,
        }
        if (self.activeProject.taskList[x].taskTimeList) {
          for (var i = 0; i<self.activeProject.taskList[x].taskTimeList.length; i++) {

            if (self.activeProject.taskList[x].taskTimeList[i].stop) {
            } else {
              if (self.activeProject.taskList[x].taskTimeList[i].userId == self.currentUser._id) {
                taskStatus = {
                  outstanding: true,
                  indexPosition: i,
                }
              }
            }
          }
        }
        self.activeUserTaskStates.push(taskStatus);
      }
    })
    }

//when trying to create a new project this is what you need
    this.newProjectTasks = [{name: '', description: ''}]
    this.addTask = function () {
      infoAlert('Task Created');
      self.newProjectTasks.push({name: '', description: ''})
    }
    this.editAddTask = function (index) {
      // infoAlert('Added Task Successfully');
      self.activeProject.taskList.push({name: '', description: ''})
    }
    this.removeTask = function() {
      warnAlert('Task Deleted!');
      var lastItem = self.newProjectTasks.length-1;
      self.newProjectTasks.splice(lastItem);
    }
    this.editRemoveTask = function(index) {
      // warnAlert('Task Deleted!');
      self.activeProject.taskList.splice(index, 1);
    }

//get the project data for projects page
    $http.get('/api/projects')
    .then(function(response) {
      self.allProjects = response.data;
    })
    // $http.get($location.$$path.toString())
    // .then(function(response) {
    //   self.activeProject = response.data;
    // })
    // console.log($location.$$path.toString())

//update project status
    this.updateProjectStatus = function() {
      if (self.activeProject.completed){
        warnAlert('Moved Project out of Completed');
      } else if (!self.activeProject.completed){
        warnAlert('Moved Project to Completed')
      }
      self.activeProject.completed = !self.activeProject.completed;
      self.updateActiveProject();
    }

// get completed projects for completed projets page
    // $http.get('/api/completedprojects')
    // .then(function(response) {
    //   self.completedprojects = response.data;
    // })

// ADD PROJECT FUNCTION
    this.getToProject = function(){
      $location.path('/projects/project');
    }
    this.getToProjects = function(){
      $location.path('/projects');
      $http.get('/api/projects')
      .then(function(response) {
        self.allProjects = response.data;
      })
    }

    var addProject = function(project) {
      project.taskList = self.newProjectTasks;
      var send = {
        project: project
      };
      $http.post('/api/projects', send)
      .then(function(response) {
        passAlert('<strong>Project created!</strong>')
        self.allProjects.push(response.data);
        project.name = '';
        project.description = '';
        self.newProjectTasks = [{name: '', description: ''}];
        $location.path('/projects')
      })
      .catch(function(err) {
        console.log(err)
      });
    }
//REMOVE PROEJCT FUNCTION
    this.deleteProject = function () {
      $http.delete(`/api/projects/project/${self.activeProject._id}`)
      .then(function(response){
        failAlert('<strong>Delete successful</strong>');
        self.activeProject = {};

      })
    }

    this.addProject = addProject;
    this.updateTimes = function() {
      var tempProjectsTotalTimeArray = [];
      var now = new Date();
      for (var x = 0; x<self.allProjects.length; x++) {
        //now we are cycling through the projects
        var projectTimeObject = {
          projectTotalTime: 0,
          taskObjectArray: [],
          projectTotalH: 0,
          projectTotalM: 0,
          projectTotalS: 0,
        };
        for (var i = 0; i<self.allProjects[x].taskList.length; i++){
          //now we are cycling through the specific project tasks
          // console.log(self.allProjectsTotalTime);
          var taskTimeObject = {
            taskTotalTime: 0,
            timeperiodObjectArray: [],
            totalH: 0,
            totalM: 0,
            totalS: 0,
          };
          if (self.allProjects[x].taskList[i].taskTimeList) {for (var j = 0; j<self.allProjects[x].taskList[i].taskTimeList.length; j++) {
            //now we are cycling through the specific time periods
            var timeperiod = self.allProjects[x].taskList[i].taskTimeList[j];
            var startTime = new Date(timeperiod.start);
            if (timeperiod.stop) {
              var stopTime = new Date(timeperiod.stop)
              var timeperiodTime = stopTime-startTime;
              taskTimeObject.taskTotalTime += timeperiodTime;
              taskTimeObject.totalH = calcHour(taskTimeObject.taskTotalTime);
              taskTimeObject.totalM = calcMin(taskTimeObject.taskTotalTime)
              taskTimeObject.totalS = calcSec(taskTimeObject.taskTotalTime);
              var timePeriodTimeObject = {
                stopTime: timeperiod.stop,
                totalTime: timeperiodTime,
              };
            } else {
              var timeperiodTime = now - startTime;
              taskTimeObject.taskTotalTime += timeperiodTime;
              taskTimeObject.totalH = calcHour(taskTimeObject.taskTotalTime);
              taskTimeObject.totalM = calcMin(taskTimeObject.taskTotalTime)
              taskTimeObject.totalS = calcSec(taskTimeObject.taskTotalTime);
              var timePeriodTimeObject = {
                stopTime: now,
                totalTime: timeperiodTime,
              }
            }
            taskTimeObject.timeperiodObjectArray.push(timePeriodTimeObject);
          }}
          projectTimeObject.projectTotalTime += taskTimeObject.taskTotalTime;
          projectTimeObject.projectTotalH = calcHour(projectTimeObject.projectTotalTime);
          projectTimeObject.projectTotalM = calcMin(projectTimeObject.projectTotalTime);
          projectTimeObject.projectTotalS = calcSec(projectTimeObject.projectTotalTime);
          projectTimeObject.taskObjectArray.push(taskTimeObject);
        }
        tempProjectsTotalTimeArray.push(projectTimeObject);
      }
      self.allProjectsTotalTime = tempProjectsTotalTimeArray;
      $timeout(self.updateTimes, 1000);
    }
    this.updateTimes()

    //go to accounts
    function accountsView() {
      getUser();
      //console.log("what is this user", this.currentUser);;
      $http.get(`api/projects/ttt/${"test"}`)
        $http.get(`api/projects/ttt/${self.currentUser}`)
        .then(function(response) {
          console.log("stats======", response.data);
          self.userStats = response.data;
          console.log("stats===2===", self.userStats);
          //$state.go('account', {url: '/account'});
          $location.path('/account');
        })
        .catch(function(err) {
          console.log(err);
        })
    };
    this.accountsView = accountsView;

//Logout Flash
  function logFlash() {
    $http.delete('/api/users/logout')
      .then(function(response){
        $state.go('landing', {url: '/'});
        infoAlert('You have been logged out!')
      });
  }
  this.logFlash = logFlash;
//Flash starts here
  function passAlert(msg){
    var id = Flash.create('success', msg, 7000, {class: 'flashAlert'}, true);
  }

  function failAlert(msg){
    var id = Flash.create('danger', msg, 7000, {class: 'flashAlert'}, true);
  }

  function infoAlert(msg){
    var id = Flash.create('info', msg, 7000, {class: 'flashAlert'}, true);
  }

  function warnAlert(msg){
    var id = Flash.create('warning', msg, 7000, {class: 'flashAlert'}, true);
  }


//Some Math for times
  function calcHour(total){
    return Math.floor(total/(1000*60*60));
  }

  function calcMin(total){
    return Math.floor(total/(1000*60)%60);
  }

  function calcSec(total){
    return Math.floor((total/1000)%60);
  }

}
})()

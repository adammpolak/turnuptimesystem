(function(){
  angular.module('turnupApp')
  .controller('projectsController', projectsController);
  projectsController.$inject = ['$http', '$location', '$state', 'Flash'];

  function projectsController($http, $location, $state, Flash) {
    var self = this;
    this.number = 7;

    this.allProjects = [];
    this.completedprojects = [];
    this.activeProject = {};
    this.activeUserTaskStates = [];
    this.removeTask = function(index) {
      self.activeProject.taskList[index].splice(index, 1);
      self.updateActiveProject();
    }
//update time for a certain task
    this.updateTaskTimePeriod = function(index){
      var now = new Date();
      //this checks if there is an outstanding timeperiod for the current user
      if (self.activeUserTaskStates[index].outstanding === true) {
        warnAlert('Stopping Timer!');
        var timePeriodIndex = self.activeUserTaskStates[index].indexPosition;
        self.activeProject.taskList[index].taskTimeList[timePeriodIndex].stop = now;
        self.activeUserTaskStates[index] = {
          outstanding: false,
          indexPosition: null,
        };
        //this is run if this task has outstanding time state
      } else {
        //this is run if the task does not have outstanding time state
        infoAlert('Starting new timer!');
        var newTimePeriodObject = {
          userId: self.currentUser._id,
          user: self.currentUser.username,
          start: now,
          stop: null,
        }
        self.activeProject.taskList[index].taskTimeList.push(newTimePeriodObject);
        self.activeUserTaskStates[index] = {
          outstanding: true,
          indexPosition: self.activeProject.taskList[index].taskTimeList.length-1,
        }
      }
      //this will be the put route to update the new object with the information
      self.updateActiveProject();
    }

//active user
    $http.get('/api/helpers/get-user')
      .then(function(response) {
        self.currentUser = response.data.user;
      })
      .catch(function(err){
        console.log('err', err)
      })

//updating a project status
    this.updateActiveProject = function () {
      console.log(self.activeProject);
      $http.put(`/api/projects/project`, self.activeProject)
      .then(function(response){
        passAlert('Update successful!');
        console.log(response);
      })
    }
    this.goToNewProject = function(){
      console.log('frank');
      $location.path('/projects/project/new')
    }

//display a project
    this.displayThisProject = function(index) {
      self.activeUserTaskStates = [];
      self.activeProject = self.allProjects[index];
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
    }

//when trying to create a new project this is what you need
    this.newProjectTasks = [{name: '', description: ''}]
    this.addTask = function () {
      infoAlert('Task Created');
      self.newProjectTasks.push({name: '', description: ''})
    }
    this.editAddTask = function (index) {
      infoAlert('Added Task Successfully');
      self.activeProject.taskList.push({name: '', description: ''})
    }
    this.removeTask = function() {
      warnAlert('Task Deleted!');
      var lastItem = self.newProjectTasks.length-1;
      self.newProjectTasks.splice(lastItem);
    }
    this.editRemoveTask = function(index) {
      warnAlert('Task Deleted!');
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
      console.log(self.activeProject);
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
      console.log('clicked add project button')
      console.log(project);
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
}
})()

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
//update time for a certain task
    this.updateTaskTimePeriod = function(index){
      var now = new Date();
      //this checks if there is an outstanding timeperiod for the current user
      if (self.activeUserTaskStates[index].outstanding === true) {
        var timePeriodIndex = self.activeUserTaskStates[index].indexPosition;
        self.activeProject.taskList[index].taskTimeList[timePeriodIndex].stop = now;
        self.activeUserTaskStates[index] = {
          oustanding: false,
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
        self.activeProject.taskList[index].taskTimeList.push(newTimePeriodObject);
        self.activeUserTaskStates[index] = {
          outstanding: true,
          indexPosition: self.activeProject.taskList[index].taskTimeList.length-1,
        }
        console.log(self.activeProject);
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
      $http.put(`/api/projects/${self.activeProject._id}`, self.activeProject)
      .then(function(response){
        console.log(response);
      })
    }

//display a project
    this.displayThisProject = function(index) {
      self.activeProject = self.allProjects[index];
      for (var x = 0; x<self.activeProject.taskList.length; x++){
        var taskStatus = {
          oustanding: false,
          indexPosition: null,
        }
        for (var i = 0; i<self.activeProject.taskList[x].taskTimeList.length; i++) {
          if (!self.activeProject.taskList[x].taskTimeList[i].stop &&
              self.activeProject.taskList[x].taskTimeList[i].userId == self.currentUser._id) {
                taskStatus = {
                  outstanding: true,
                  indexPosition: i,
                }
          }
        }
        self.activeUserTaskStates.push(taskStatus);
      }
      console.log(self.activeUserTaskStates);
    }

//when trying to create a new project this is what you need
    this.newProjectTasks = [{name: '', description: ''}]
    this.addTask = function () {
      self.newProjectTasks.push({name: '', description: ''})
    }
    this.removeTask = function() {
      var lastItem = self.newProjectTasks.length-1;
      self.newProjectTasks.splice(lastItem);
    }
//get the project data for projects page
    $http.get('/api/projects')
    .then(function(response) {
      self.allProjects = response.data;
    })

// get completed projects for completed projets page
    // $http.get('/api/completedprojects')
    // .then(function(response) {
    //   self.completedprojects = response.data;
    // })

// ADD PROJECT FUNCTION
    var addProject = function(project) {
      project.taskList = self.newProjectTasks;
      console.log('clicked add project button')
      console.log(project);
      var send = {
        project: project
      };
      $http.post('/api/projects', send)
      .then(function(response) {
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

// EDIT/UPDATE PROJECT FUNCTION
    var editProject = function(project) {
      console.log(this.allProjects, 'has been updated');
      $http.post(`/projects/${project._id}`) //want to post to projects/:id, correct?
      .then(function(response) {
        self.projects.push(response.data);
        $location.path('/projects/project')
      })
      .catch(function(err) {
        console.log(err)
      });
    }



    this.addProject = addProject;
    this.editProject = editProject;

  }

})()

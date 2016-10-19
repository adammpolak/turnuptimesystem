(function(){
  angular.module('turnupApp')

  // .filter('complete', ['completed',
  //   function(completed){
  //     function completeFilter(project) {
  //       return activeProject.completed;
  //     }
  //     completeFilter.$stateful = true;
  //     return completeFilter;
  // }])

  .controller('projectsController', projectsController);
  projectsController.$inject = ['$http', '$location', '$state'];

  function projectsController($http, $location, $state) {
    var self = this;
    this.number = 7;

    this.allProjects = [];
    this.completedprojects = [];
    this.activeProject = {};

//updating a project status
    this.updateStatus = function () {
      console.log(self.activeProject.completed);
      self.activeProject.completed = !self.activeProject.completed
      console.log('update function', self.activeProject.completed);

      // $location.path('/projects')
      // self.allProjects();
      // $http.put(`/api/projects/${self.activeProject._id}`, self.activeProject)
      // .then(function(response){
      //   // $state.go('completedprojects', {url: '/completedprojects'})
      // })
    }

// function should change status to completed

  // display completed projects
  this.displayCompletedProject = function(index) {
    // self.activeProject = self.completedProjects[index];
    // if (self.activeProject.completed === true) {
    //   console.log('project completed', 'this.activeProject');
    // }
  }

//display a project
    this.displayThisProject = function(index) {
      self.activeProject = self.allProjects[index];
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

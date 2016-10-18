(function(){
  angular.module('turnupApp')
  .controller('projectsController', projectsController);
  projectsController.$inject = ['$http', '$location'];

  function projectsController($http, $location) {
    var self = this;
    this.number = 7;

    this.projects = [];
    this.completedprojects = [];

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
      self.projects = response.data;
    })

// get completed projects for completed projets page
    $http.get('/completedprojects')
    .then(function(response) {
      self.completedprojects = response.data;
    })

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
        self.projects.push(response.data);
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
      console.log(this.projects, 'has been updated');
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
<<<<<<< HEAD

=======
>>>>>>> ff6eae2dfc38976f51430d254a1c85c43a53c5f6
})()

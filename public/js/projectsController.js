(function(){
  angular.module('turnupApp')
  .controller('projectsController', projectsController);
  projectsController.$inject = ['$http', '$location'];

  function projectsController($http, $location) {
    var self = this;
    this.number = 7;

    this.projects = [];
    this.completedprojects = [];
    this.newProjectTasks = [{name: '', description: ''}]

//add new options for create new project

//get the project data for projects page
    $http.get('/projects')
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
      console.log('clicked add project button')
      console.log(this.projects, 'projects added');
      $http.post('/projects', this.projects)
      .then(function(response) {
        self.projects.push(project);
        $location.path('/projects')
      })
      .catch(function(err) {
        console.log(err)
      });
    }

// EDIT/UPDATE PROJECT FUNCTION
    var editProject = function(project) {
      console.log(this.projects, 'has been updated');
      $http.post(`/projects/${project._id}`,) //want to post to projects/:id, correct?
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

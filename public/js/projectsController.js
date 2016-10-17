(function(){
  angular.module('turnupApp')
  .controller('projectsController', projectsController);
  projectsController.$inject = ['$http', '$location'];

  function projectsController($http, $location) {
    var self = this;
    this.number = 7;

    this.projects = [];
    this.completedprojects = [];

//get the project data
    $http.get('/projects')
    .then(function(response) {
      self.projects = response.data;
    })

// ADD PROJECT FUNCTION
    var addProject = function(project) {
      console.log('clicked add project button')
      this.projects.push(project);
      console.log(this.projects, 'projects added');
      $http.post('/projects', this.projects)
      .then(function(response) {
        $location.path('/projects')
      })
      .catch(function(err) {
        console.log(err)
      });
    }

// EDIT PROJECT FUNCTION
    var editProject = function(project) {
      this.projects.push(project);
      console.log(this.projects, 'has been updated');
      $http.post(`/projects/${id}`) //want to post to projects/:id, correct?
      .then(function(response) {
        $location.path('/projects/project')
      })
      .catch(function(err) {
        console.log(err)
      });
    }


    this.addProject = addToCart;
    this.editProject = editProject;

  }
})()

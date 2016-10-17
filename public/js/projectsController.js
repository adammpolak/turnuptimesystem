(function(){
  angular.module('turnupApp')
  .controller('projectsController', projectsController);
  projectsController.$inject = ['$http', '$location'];

  function projectsController($http, $location) {
    var self = this;
    this.number = 7;

    this.projects = [];
    this.completedprojects = [];

// ADD PROJECT FUNCTION
    var addProject = function(project) {
      console.log('clicked add project button')
      this.projects.push(project);
      console.log(this.projects, 'projects added');
      $http.post('/')

    }




  }
})()

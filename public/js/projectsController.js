(function(){
  angular.module('turnupApp')
  .controller('projectsController', projectsController);
  projectsController.$inject = ['$http', '$location'];
  function projectsController($http, $location) {
    this.number = 7;
  }
})()

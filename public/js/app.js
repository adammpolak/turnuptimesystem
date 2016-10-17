(function(){
  angular.module('turnupApp', ['ui.router']).config(MainRouter);
  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'landing.html'
      })
      .state('projects', {
        url: '/projects',
        templateUrl: 'projects.html'
      })
      .state('completedprojects', {
        url: '/completedprojects',
        templateUrl: 'completedprojects.html'
      })
      .state('account', {
        url: '/account',
        templateUrl: 'account.html'
      });
      $urlRouterProvider.otherwise('/projects');
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
      })
  }
})()

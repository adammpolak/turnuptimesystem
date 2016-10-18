(function(){
  angular.module('turnupApp', ['ui.router']).config(MainRouter);
  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'landing.html',
        controller: 'authControl',
        controllerAs: 'auth'
      })
      .state('projects', {
        url: '/projects',
        templateUrl: 'projects.html'
      })
      .state('project', {
        url: '/projects/project',
        templateUrl: 'project.html'
      })
      .state('projectedit', {
        url: '/projects/project/edit',
        templateUrl: 'projectedit.html'
      })
      .state('projectnew', {
        url: '/projects/project/new',
        templateUrl: 'projectnew.html'
      })
      .state('completedprojects', {
        url: '/completedprojects',
        templateUrl: 'completedprojects.html'
      })
      .state('completedproject', {
        url: '/completedprojects/project',
        templateUrl: 'completedproject.html'
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

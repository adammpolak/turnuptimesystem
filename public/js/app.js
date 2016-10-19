(function(){
  angular.module('turnupApp', ['ui.router', 'ngFlash']).config(MainRouter);
  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'landing.html',
        controller: 'authControl',
        controllerAs: 'auth'
      })
      // .state('login', {
      //   url: '/login',
      //   templateUrl: 'login.html',
      //   controller: 'authControl',
      //   controllerAs: 'auth'
      // })
      // .state('register', {
      //   url: '/register',
      //   templateUrl: 'register.html',
      //   controller: 'authControl',
      //   controllerAs: 'auth'
      // })
      .state('projects', {
        url: '/projects',
        templateUrl: 'projects.html'
      })
      .state('projects.project', {
        url: `/project`,
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
      .state('completedprojects.completedproject', {
        url: '/completedproject',
        templateUrl: 'completedproject.html'
      })
      .state('account', {
        url: '/account',
        templateUrl: 'account.html'
      });
      $urlRouterProvider.otherwise('/projects');
  }
})()

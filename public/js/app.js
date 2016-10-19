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
      .state('projects.projectnew', {
        url: '/project/new',
        templateUrl: 'projectnew.html'
      })
      .state('account', {
        url: '/account',
        templateUrl: 'account.html'
      })
      .state('completedprojects', {
        url: '/completedprojects',
        templateUrl: 'completedprojects.html'
      })
      .state('completedprojects.completedproject', {
        url: '/completedproject/:projectId',
        templateUrl: 'completedproject.html'
      })
      .state('projects.project', {
        url: `/project/:projectId`,
        templateUrl: 'project.html'
      })
      .state('projects.edit', {
        url: '/project/:projectId/edit',
        templateUrl: 'projectedit.html'
      });
      $urlRouterProvider.otherwise('/projects');
  }
})()

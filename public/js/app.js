(function(){
  angular.module('turnupApp', ['ui.router', 'ngFlash']).config(MainRouter);
  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'landing.html',
        controller: 'authControl',
        controllerAs: 'auth',
        resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (res.data.user) {
                $state.go('projects', {url: '/projects'});
              }
            })
          }
        }
      })
      .state('projects', {
        url: '/projects',
        templateUrl: 'projects.html',
        resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
      })
      .state('projects.projectnew', {
        url: '/project/new',
        templateUrl: 'projectnew.html',
        resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
      })
      .state('account', {
        url: '/account',
        templateUrl: 'account.html',
        resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
      })
      .state('completedprojects', {
        url: '/completedprojects',
        templateUrl: 'completedprojects.html',
        resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
      })
      .state('completedprojects.completedproject', {
        url: '/completedproject/:projectId',
        templateUrl: 'completedproject.html',
        resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
      })
      .state('projects.project', {
        url: `/project/:projectId`,
        templateUrl: 'project.html',
        resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
      })
      .state('projects.edit', {
        url: '/project/:projectId/edit',
        templateUrl: 'projectedit.html',
        resolve:{ logged: function($http, $state){
          $http.get('/api/helpers/get-user')
            .then(function(res){
              if (!res.data.user) {
                $state.go('landing', {url: '/'});
              }
            })
          }
        }
      });
      $urlRouterProvider.otherwise('/projects');
  }
})()

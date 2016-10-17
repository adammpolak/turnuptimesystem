(function(){
  var main = angular.module('turnupApp');
    main.controller('AuthControl', function($http, $state, $stateParams){
      var self = this;

      function register(userObj){
        $http.post('/signup', {username: userObj.username, password: userObj.password})
          .then(function(res){
            $state.go('landing', {url: '/'});
          })
      }

      function login(userObj){
        $http.post('/login', {username: userObj.username, password: userObj.password})
          .then(function(res){
            self.user = res.data.user;
            $state.go('projects', {url: '/projects'});
          })
      }
    })
})()

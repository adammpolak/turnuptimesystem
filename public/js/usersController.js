(function(){
  angular.module('turnupApp')
    .controller('authControl', authControl)
    authControl.$inject = ['$http', '$location', '$stateParams'];

  function authControl($http, $state, $stateParams){

    var self = this;
    
    function register(userObj){
      $http.post('/signup', {username: userObj.usernamereg, password: userObj.passwordreg})
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

    this.login = login;
    this.register = register;
  };
})();

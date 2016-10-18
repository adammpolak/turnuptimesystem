(function(){
  angular.module('turnupApp')
    .controller('authControl', authControl)

  function authControl($http, $state){

    var self = this;

    function register(userObj){
      $http.post('api/users/register', {username: userObj.usernamereg, password: userObj.passwordreg})
        .then(function(res){
          $state.go('landing', {url: '/'});
          userObj.passwordreg = '';
          userObj.usernamereg = '';
        })
    }

    function login(userObj){
      $http.post('api/users/login', {username: userObj.username, password: userObj.password})
        .then(function(res){
          self.user = res.data.user;
          $state.go('projects', {url: '/projects'});
        })
    }

    this.login = login;
    this.register = register;
    this.userObject;
  };
})();

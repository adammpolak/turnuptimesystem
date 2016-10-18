(function(){
  angular.module('turnupApp')
    .controller('authControl', authControl)

  function authControl($http, $state){

    var self = this;

    function register(userObj){
      $http.post('/register', {username: userObj.usernamereg, password: userObj.passwordreg})
        .then(function(res){
          console.log(res);
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

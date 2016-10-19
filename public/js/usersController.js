(function(){
  angular.module('turnupApp')
    .controller('authControl', authControl)
    authControl.$inject = ['$http', '$state', 'Flash']
  function authControl($http, $state, Flash){

    var self = this;

    function register(userObj){
      $http.post('api/users/register', {username: userObj.usernamereg, password: userObj.passwordreg})
        .then(function(res){
          $state.go('projects', {url: '/projects'});
          successAlert();
          userObj.passwordreg = '';
          userObj.usernamereg = '';
        })
    }

    function login(userObj){
      $http.post('api/users/login', {username: userObj.username, password: userObj.password})
        .then(function(res){
          self.user = res.data.user;
          console.log(self.user)
          $state.go('projects', {url: '/projects'});
        })
    }

    function successAlert() {
      var message = '<strong>Success!</strong> Registered successfully!'
      var id = Flash.create('success', message, 7000, {}, true);
    }

    this.login = login;
    this.register = register;
    // this.successAlert = successAlert;
    this.userObject;
  };
})();

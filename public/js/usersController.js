(function(){
  angular.module('turnupApp')
    .controller('authControl', authControl)
    authControl.$inject = ['$http', '$state', 'Flash']
  function authControl($http, $state, Flash){

    var self = this;

    function register(userObj){
      $http.post('api/users/register', {username: userObj.usernamereg, password: userObj.passwordreg})
        .then(function(res){
          if (res.data.message){
            $state.go('landing', {url: '/'});
            authFail(res.data.message);
          } else {
            $state.go('projects', {url: '/projects'});
            successAlert();
            userObj.passwordreg = '';
            userObj.usernamereg = '';
          }
        })
    }

    function login(userObj){
      $http.post('api/users/login', {username: userObj.username, password: userObj.password})
        .then(function(res){
          if (res.data.message) {
            $state.go('landing', {url: '/'});
            authFail(res.data.message);
          } else {
            self.user = res.data.user;
            console.log(self.user)
            $state.go('projects', {url: '/projects'});
            loginSuccess()
          }
        })
    }

    function successAlert() {
      var message = '<strong>Success!</strong> Registered successfully!'
      var id = Flash.create('success', message, 7000, {}, true);
    }

    function loginSuccess() {
      var message = '<strong>Success!</strong> Login successful!'
      var id = Flash.create('success', message, 7000, {}, true);
    }

    function authFail(reason){
      var message = reason;
      var id = Flash.create('danger', message, 7000, {}, true);
    }

    this.login = login;
    this.register = register;
    this.userObject;
  };
})();

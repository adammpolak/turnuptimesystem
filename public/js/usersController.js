(function(){
  angular.module('turnupApp')
    .controller('authControl', authControl)
    authControl.$inject = ['$http', '$state', 'Flash']
  function authControl($http, $state, Flash){

    var self = this;

    function register(userObj){
      $http.post('api/users/register', {username: userObj.usernamereg, password: userObj.passwordreg})
        .then(function(res){
<<<<<<< Updated upstream
          $state.go('projects', {url: '/projects'});
          successAlert();
          userObj.passwordreg = '';
          userObj.usernamereg = '';
=======
          if (res.errmsg){
            $state.go('landing', {url: '/'});
            authFail(res.errmsg.toString());
          } else {
            $state.go('projects', {url: '/projects'});
            successAlert();
            userObj.passwordreg = '';
            userObj.usernamereg = '';
          }
>>>>>>> Stashed changes
        })
    }

    function login(userObj){
      $http.post('api/users/login', {username: userObj.username, password: userObj.password})
        .then(function(res){
          console.log(res);
          console.log(res.errmsg);
          if (res.errmsg) {
            $state.go('landing', {url: '/'});
            authFail(res.errmsg.toString());
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
      var message = '<strong>Failure!</strong>' + reason;
      var id = Flash.create('danger', message, 7000, {}, true);
    }

    this.login = login;
    this.register = register;
<<<<<<< Updated upstream
    // this.successAlert = successAlert;
=======
>>>>>>> Stashed changes
    this.userObject;
  };
})();

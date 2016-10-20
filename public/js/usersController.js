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
            successAlert('<strong>Success!</strong> Registered successfully!');
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

    function successAlert(msg) {
      var id = Flash.create('success', msg, 7000, {class: 'flashAlert'}, true);
    }

    function loginSuccess() {
      var message = '<strong>Success!</strong> Login successful!'
      var id = Flash.create('success', message, 7000, {class: 'flashAlert'}, true);
    }

    function authFail(reason){
      var id = Flash.create('danger', reason, 7000, { class: 'flashAlert'}, true);
    }

    // var updateUsername = function(user) {
    //   console.log('clicked', user, 'from updateUsername function');
    //   console.log(user._id, 'from updateUsername function');
    //   $http.patch(`/api/users/${user._id}`, user)
    //   .then(function(response) {
    //     console.log(response);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   })
    // }

    var setPassword = function(userObj) {
      console.log('clicked');
      console.log(userObj, 'from updatePassword Function');
      successAlert('<strong>Success!</strong> Password change completed.')
      $http.patch(`api/users/${userObj._id}`, {username: userObj.username, password: userObj.password, passwordConfirmation: userObj.passwordConfirmation})
    }

    this.login = login;
    this.register = register;
    this.userObject;
    this.setPassword = setPassword;
    // this.updateUsername = updateUsername;
  };
})();

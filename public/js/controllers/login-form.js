angular.module('MyApp').controller('loginFormCtrl', ['$http', function($http){
  var ctrl = this;
  this.username = "";
  this.password = "";

  this.submitLogin = function(){

    $http({
      method: 'POST',
      url: '/sessions',
      data: {
        username: this.username,
        password: this.password
      }
    }).then(function(response){
      console.log(response);
    }, function(error) {
      console.log(error);
    });

  };//End submitLogin()
}]); //End Controller

angular.module('MyApp').controller('signUpFormCtrl', ['$http', function ($http) {
  var ctrl = this;
  this.username = "";
  this.password = "";
  this.confirmPassword = "";
  this.mismatchedPW = false;

  this.createAccount = function () {
    if (this.password === this.confirmPassword) {
      this.mismatchedPW = false;
      console.log('password accepted');
      $http({
        method: 'POST',
        url: '/users',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(
        function (response) {
          console.log(response);
        }, function (error) {
          console.log(error);
        }
      );
    } else {
      console.log('password NOT accepted');
      this.mismatchedPW = true;
    }
  };
}]);

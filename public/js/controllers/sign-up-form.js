angular.module('MyApp').controller('signUpFormCtrl', ['$http', function ($http) {
  var ctrl = this;
  this.username = '';
  this.password = '';
  this.confirmPassword = '';
  this.msgContent;
  this.displayMessage = false;

  this.createAccount = function () {
    if (this.password === this.confirmPassword) {
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
          if (!response.data.errmsg) {
            console.log('account created');
            // displays success message with the following content
            ctrl.msgContent = 'Thank you, your account has been created. Please log in to continue.'
            ctrl.displayMessage  = true;
          } else if (response.data.code === 11000){
            // displays fail message with the following content
            ctrl.msgContent = 'Sorry, the username you picked is already taken. Please choose another one.';
            ctrl.displayMessage = true;
          } else {
            // displays fail message with the following content
            ctrl.msgContent = 'Sorry, something went wrong. Please try again.';
            ctrl.displayMessage = true;
          }
          ctrl.username = '';
          ctrl.password = '';
          ctrl.confirmPassword = '';
        }, function (error) {
          console.log(error);
          // displays fail message with the following content
          ctrl.msgContent = 'Sorry, something went wrong. Please try again.';
          ctrl.displayMessage = true;
          ctrl.username = '';
          ctrl.password = '';
          ctrl.confirmPassword = '';
        });
    } else {
      // displays fail message with the following content
      ctrl.msgContent = 'Sorry, the passwords you entered did not match.';
      ctrl.displayMessage = true;
    }
  };

  //Event listener to close modal
  $('.close').on('click', function () {
    $('#signup-modal').css('display', 'none');
  });
}]);

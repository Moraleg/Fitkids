angular.module('MyApp').controller('editProfileFormController', ['$http',
function ($http) {
  // initialize variables
  var ctrl = this;
  this.newUsername;
  this.newPassword;
  this.confirmNewPassword;
  this.msgContent;
  this.displayMessage = false;

  // *** password update ***
  this.editPassword = function () {
    // checks if password and password-confirm match
    if (this.newPassword === this.confirmNewPassword) {
      // removes fail message after failed update attempt
      this.displayMessage = false;
      // http put request to server
      $http({
        method: 'PUT',
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // NOTE: This ID here is taken from one of my DB entries and then hardcoded into the url for testing. TAKE OUT once login works!
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        url: '/users/59078755dfabec06e91ae6cc',
        data: {
          password: this.newPassword
        }
      }).then(
        // in case of success
        function (response) {
          console.log(response);
          // displays success message with the following content
          ctrl.msgContent = "Thank you! Your changes were saved."
          ctrl.displayMessage = true;
          // clears form
          ctrl.newUsername = "";
          ctrl.newPassword  = "";
          ctrl.confirmNewPassword = "";
        },
        // in case of failure
        function (error) {
          console.log(error);
          // displays success message with the following content
          ctrl.msgContent = "Sorry, something went wrong! Your changes were not saved. Please try again."
          ctrl.displayMessage = true;
        });
    } else {
      // displays success message with the following content
      ctrl.msgContent = "Sorry, the passwords you entered did not match."
      ctrl.displayMessage = true;
    }
  }
}]);

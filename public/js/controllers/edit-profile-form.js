angular.module('MyApp').controller('editProfileFormController', ['$http',
function ($http) {
  // initialize variables
  var ctrl = this;
  this.newUsername;
  this.newPassword;
  this.confirmNewPassword;
  this.msgContent;
  this.displayMessage = false;


  this.editUsername = function () {
    $http({
      method: 'PATCH',
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // NOTE: This ID here is taken from one of my DB entries and then hardcoded into the url for testing. TAKE OUT once login works!
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      url: '/users/', // + id
      data: {
        username: this.newUsername
      }
    }).then(
      function (response) {
        console.log(response);
        if (response.data.username !== undefined) {
          ctrl.msgContent = "Thank you! Your username was changed to " + response.data.username;
          ctrl.displayMessage = true;
        } else if (response.data.errmsg !== undefined && response.data.codeName === 'DuplicateKey') {
          ctrl.msgContent = "Sorry, the username you picked is already taken. Please choose another one.";
          ctrl.displayMessage = true;
        } else {
          ctrl.msgContent = "Sorry, something went wrong! Your changes were not saved. Please try again."
        }
      },
      function (error) {
        console.log(error);
        ctrl.msgContent = "Sorry, something went wrong! Your changes were not saved. Please try again."
        ctrl.displayMessage = true;
      });
  };

  // *** password update ***
  this.editPassword = function () {
    // checks if password and password-confirm match
    if (this.newPassword === this.confirmNewPassword) {
      // removes fail message after failed update attempt
      this.displayMessage = false;
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // NOTE: Add HTTP GET request to sessions once login works
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

      // HTTP PUT request to server
      $http({
        method: 'PATCH',
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        // NOTE: This ID here is taken from one of my DB entries and then hardcoded into the url for testing. TAKE OUT once login works!
        //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        url: '/users/', // + id
        data: {
          password: this.newPassword
        }
      }).then(
        // in case of success
        function (response) {
          console.log(response);
          if (!response.data.errmsg) {
            // displays success message with the following content
            ctrl.msgContent = "Thank you! Your password was changed."
            ctrl.displayMessage = true;
            // clears form
            ctrl.newUsername = "";
            ctrl.newPassword  = "";
            ctrl.confirmNewPassword = "";
          } else {
            ctrl.msgContent = "Sorry, something went wrong! Your changes were not saved. Please try again."
            ctrl.displayMessage = true;
          }
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
      ctrl.displayMessage  = true;
    }
  };
}]);

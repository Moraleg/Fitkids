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
      method: 'GET',
      url: '/sessions'
    }).then(
      function (response) {
        console.log(response);
        $http({
          method: 'PATCH',
          url: '/users/' + response.data._id,
          data: {
            username: ctrl.newUsername
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
      }, function (error) {
        console.log(error);
      });
  };

  // *** password update ***
  this.editPassword = function () {
    // checks if password and password-confirm match
    if (this.newPassword === this.confirmNewPassword) {
      // removes fail message after failed update attempt
      this.displayMessage = false;
      $http({
        method: 'GET',
        url: '/sessions'
      }).then(
        function (response) {
          console.log(response);
          // should we make the pw data blank before we send this back from the server?
          // HTTP PUT request to server
          $http({
            method: 'PATCH',
            url: '/users/' + response.data._id,
            data: {
              password: ctrl.newPassword
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
        }, function (error) {
          console.log(error);
        });
    } else {
      // displays success message with the following content
      ctrl.msgContent = "Sorry, the passwords you entered did not match."
      ctrl.displayMessage  = true;
    }
  };
}]);

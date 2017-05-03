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
        // only make request if the user is logged in
        if (response.data) {
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
              this.newUsername = "";
            },
            function (error) {
              console.log(error);
              ctrl.msgContent = "Sorry, something went wrong! Your changes were not saved. Please try again."
              ctrl.displayMessage = true;
              this.newUsername = "";
            });
        } else {
          console.log('not logged-in');
        }
      }, function (error) {
        console.log(error);
      });
    // clears form
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
          // only make request if the user is logged in
          if(response.data) {
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
                } else {
                  ctrl.msgContent = "Sorry, something went wrong! Your changes were not saved. Please try again."
                  ctrl.displayMessage = true;
                }
                // clears form
                ctrl.newPassword  = "";
                ctrl.confirmNewPassword = "";
              },
              // in case of failure
              function (error) {
                console.log(error);
                // displays success message with the following content
                ctrl.msgContent = "Sorry, something went wrong! Your changes were not saved. Please try again."
                ctrl.displayMessage = true;
                // clears form
                ctrl.newPassword  = "";
                ctrl.confirmNewPassword = "";
              });
          } else {
            console.log('not logged in');
          }
        }, function (error) {
          console.log(error);
        });
    } else {
      // displays fail message with the following content
      ctrl.msgContent = "Sorry, the passwords you entered did not match."
      ctrl.displayMessage  = true;
    }
  };
}]);

angular.module('MyApp').controller('editProfileFormController', ['$http',
function ($http) {
  // initialize variables
  var ctrl = this;
  this.newUsername = '';
  this.newPassword = '';
  this.confirmNewPassword = '';
  this.msgContent = '';
  this.displayMessage = false;

  // function for updating username
  this.editUsername = function () {
    $http({ // http request to get sessions data
      method: 'GET',
      url: '/sessions'
    }).then(
      function (response) { // in case of success
        console.log(response); // log server response
        if (response.data) { // if session exists
          $http({ // http request to update username
            method: 'PATCH',
            url: '/users/' + response.data._id,
            data: {
              username: ctrl.newUsername
            }
          }).then(
            function (response) { // in case of success
              console.log(response); // log server response
              if (response.data.username !== undefined) { // if username
                // data exists, show  success message
                ctrl.msgContent = 'Thank you! Your username was changed to ' +
                 response.data.username;
                ctrl.displayMessage = true;
              } else if (response.data.code === 11000) { // if db responded
                // with dublicate key error, ask user to pick different username
                ctrl.msgContent =
                "Sorry, the username you picked is already taken. Please choose another one.";
                ctrl.displayMessage = true;
              } else { // else display error message
                ctrl.msgContent =
                'Sorry, something went wrong! Your changes were not saved. Please try again.'
              }
              this.newUsername = ''; // clear form
            },
            function (error) { // in case of failure
              console.log(error); // log error
              ctrl.msgContent = // else display error message
              'Sorry, something went wrong! Your changes were not saved. Please try again.'
              ctrl.displayMessage = true;
              this.newUsername = ""; // clear form
            });
        } else { // for testing
          console.log('not logged-in'); // log that user is not logged-in
        }
      }, function (error) { // in case of failure
        console.log(error); // log error
      });
  };

  // *** password update ***
  this.editPassword = function () {
    // checks if password and password-confirm match
    if (this.newPassword === this.confirmNewPassword) {
      // removes fail message after failed update attempt
      this.displayMessage = false;
      $http({ // http request to get session data
        method: 'GET',
        url: '/sessions'
      }).then(
        function (response) { // in case of success
          console.log(response); // log response
          if(response.data) { // if session data exists
            $http({// HTTP patch request to update password
              method: 'PATCH',
              url: '/users/' + response.data._id,
              data: {
                password: ctrl.newPassword
              }
            }).then(
              function (response) { // in case of success
                console.log(response); // log response
                if (!response.data.errmsg) { // if no errmsg
                  // display success message
                  ctrl.msgContent = 'Thank you! Your password was changed.'
                  ctrl.displayMessage = true;
                } else { // else display failure message
                  ctrl.msgContent = 'Sorry, something went wrong! Your changes were not saved. Please try again.'
                  ctrl.displayMessage = true;
                }
                ctrl.newPassword  = ''; // clear form
                ctrl.confirmNewPassword = '';
              },
              function (error) { // in case of failure
                console.log(error);
                // display success message with the following content
                ctrl.msgContent = "Sorry, something went wrong! Your changes were not saved. Please try again."
                ctrl.displayMessage = true;
                // clear form
                ctrl.newPassword  = '';
                ctrl.confirmNewPassword = '';
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

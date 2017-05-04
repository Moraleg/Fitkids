angular.module('MyApp').controller('newChildCtrl', ['$http', function ($http) {
  // initialize variables
  var ctrl = this;
  ctrl.name = '';
  ctrl.msgContent = '';
  ctrl.displayMessage = false;

  // function for http post request to create a new child in database
  ctrl.addChild = function () {
    ctrl.msgContent = '';
    ctrl.displayMessage = false;
    $http({ // http request to get data of logged in user
      method: 'GET',
      url: '/sessions'
    }).then(
      function (response) { // in case of success
        console.log(response); // log server response
        if (response.data) { // if session exists ...
          $http({ // http post request to create new child in database
            method: 'POST',
            url: '/children',
            data: {
              name: ctrl.name
            }
          }).then(
            function (response) { // in case of success
              if (response.data && !response.data.errors) {
                ctrl.msgContent = 'Thank you! You created a profile for ' +
                response.data.name + '.';
                ctrl.displayMessage = true;
                ctrl.name = '';
              } else if (!response.data || response.data.errors) {
                ctrl.msgContent = 'Sorry, something went wrong! Please try again.';
                ctrl.displayMessage = true;
                ctrl.name = '';
              }
              console.log(response); // log server response
            }, function (error) { // in case of failure
              ctrl.msgContent = 'Sorry, something went wrong! Please try again.';
              ctrl.displayMessage = true;
              ctrl.name = '';
              console.log(error); // log error
            });
        } else { // if session does not exists (just for testing) ...
          console.log('not logged in!'); // log that user is not logged in
          ctrl.name = '';
        }
      }, function (error) { // in case of failure
        ctrl.msgContent = 'Sorry, something went wrong! Please try again.';
        ctrl.displayMessage = true;
        ctrl.name = '';
        console.log(error); // log error
      });
  };
}]);

angular.module('MyApp').controller('deleteProfileController', ['$http', '$window', function ($http, $window) {
  // initialise needed variables
   var ctrl = this;
   this.showConfirm = false;
   this.showMsg = false;
   this.msgContent = '';

   // function creates buttons to abort or confirm delete
   this.confirmDelete = function () {
     this.showConfirm = true;
   };

   // function removes buttons to abort or confirm delete
   this.abortDelete = function () {
     this.showConfirm = false;
   };

   // function for deleting account
   this.deleteProfile = function () {
     $http({ // http request to get sessions data
       method: 'GET',
       url: '/sessions'
     }).then(
           function (response) { // in case of success
             console.log(response); // log response
             if(response.data) { // if sessions data exists
               $http({ // http request to delete account
                   method: 'DELETE',
                   url: '/users/' + response.data._id,  // based on user id
                   // from sessions data
               }).then(
                 function (response) { // in case of success
                   console.log(response); // log response
                   // show success message and hide confirm / abort button
                   ctrl.msgContent = 'Your profile was successfully deleted.'
                   ctrl.showMsg = true;
                    setTimeout(function() { // reload page after 3 seconds
                      $window.location.reload();
                      this.showConfirm = false;
                    }, 3000);
                 },
                 function (error) { // in case of failure
                   console.log(error); // log error
                   // show fail message and hide confirm / abort button
                   ctrl.msgContent = 'Sorry, something went wrong. Please try again.'
                   ctrl.showMsg = true;
                   this.showConfirm = false;
                 });
             } else { // just for testing
               console.log('not logged in');
               // --> nothing happens if user not logged in
             }
           }, function (error) { // in case of failure
             console.log(error); // log error
           });
   };
}]);

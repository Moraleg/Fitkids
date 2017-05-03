angular.module('MyApp').controller('deleteProfileController', ['$http', '$window', function ($http, $window) {
   var ctrl = this;
   this.showConfirm = false;
   this.showMsg = false;
   this.msg;

   this.confirmDelete = function () {
     this.showConfirm = true;
     console.log('clicked');
   };

   this.abortDelete = function () {
     this.showConfirm = false;
   };

   this.deleteProfile = function () {
     $http({
       method: 'GET',
       url: '/sessions'
     }).then(
           function (response) {
             console.log(response);
             if(response.data) {
               $http({
                   method: 'DELETE',
                   url: '/users/' + response.data._id,
               }).then(
                 function (response) {
                   console.log(response);
                   ctrl.msg = 'Your profile was successfully deleted.'
                   ctrl.showMsg = true;
                    setTimeout(function() {
                      console.log('logging out now');
                      $window.location.reload();
                    }, 3000);
                 },
                 function (error) {
                   console.log(error);
                   ctrl.showMsg = true;
                   ctrl.msg = 'Sorry, something went wrong. Please try again.'
                 });
             } else {
               console.log('not logged in');
             }
           }, function (error) {
             console.log(error);
           });
           this.showConfirm = false;
   };
}]);

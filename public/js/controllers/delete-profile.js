angular.module('MyApp').controller('deleteProfileController', ['$http',
 function ($http) {
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
         method: 'DELETE',
         url: '/users/', // + id
     }).then(
       function (response) {
         console.log(response);
         ctrl.msg = 'Your profile was successfully deleted.'
         ctrl.showMsg = true;
         setTimeout(function() {
           console.log('logging out now');
           // page reload!
         }, 3000);
       },
       function (error) {
         console.log(error);
         ctrl.showMsg = true;
         ctrl.msg = 'Sorry, something went wrong. Please try again.'
       }
     )
   };
}]);

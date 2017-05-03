angular.module('MyApp').directive('deleteProfile', function () {
  return {
    restrict: 'E',
    templateUrl: '../../partials/delete-profile.html',
    controller: 'deleteProfileController',
    controllerAs: 'deleteProfileCtrl'
  }
});

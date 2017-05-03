angular.module('MyApp').directive('editProfileForm', function () {
  return {
    restrict: 'E',
    templateUrl: '../../partials/edit-profile-form.html',
    controller: 'editProfileFormController',
    controllerAs: 'editProfileCtrl'
  };
});

angular.module('MyApp').directive('signUpForm', function () {
  return {
    restrict: 'E',
    templateUrl: '../../partials/sign-up-form.html',
    controller: 'signUpFormCtrl',
    controllerAs: 'signUp'
  };
});

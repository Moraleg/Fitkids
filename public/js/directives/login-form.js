angular.module('MyApp').directive('loginForm', function(){
  return {
    restrict: 'E',
    templateUrl: '../../partials/login-form.html',
    controller: 'loginFormCtrl',
    controllerAs: 'ctrl'
  };
});

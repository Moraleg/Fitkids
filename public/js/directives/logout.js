angular.module('MyApp').directive('userLogout', function(){
  return {
    restrict: 'E',
    templateUrl: '../../partials/logout.html',
    controller: 'logoutCtrl',
    controllerAs: 'logout'
  };
});

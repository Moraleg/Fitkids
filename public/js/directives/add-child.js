angular.module('MyApp').directive('addChild', function(){
  return {
    restrict: 'E',
    templateUrl: '../../partials/add-child.html',
    controller: 'newChildCtrl',
    controllerAs: 'newChild'
  };
});

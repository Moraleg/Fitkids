angular.module('MyApp').directive('showChildren', function(){
  return {
    restrict: 'E',
    templateUrl: '../../partials/show-children.html',
    controller: 'showChildrenCtrl',
    controllerAs: 'showChildren'
  };
});

angular.module('MyApp').controller('ViewController', ['$http', function($http) {
  var ctrl = this;
  ctrl.currentView = "splash";
  ctrl.getSession = function() {
    $http({
      method: 'GET',
      url: '/sessions'
    }).then(function(response) {
      ctrl.sessionData = response.data;
    }, function(error) {
      console.log('Error');
    });
  };
  ctrl.changeView = function(view) {
    ctrl.currentView = view;
  };
  ctrl.getSession();
}]);

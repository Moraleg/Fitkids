angular.module('MyApp').controller('logoutCtrl', ['$http', '$scope', function($http,$scope){
  var controller = this;

  this.logoutUser = function(){
    $http({
      method: 'DELETE',
      url: '/sessions'
    }).then(function(response){
      console.log(response);
      $scope.viewCtrl.getSession();
    }, function(error){
      console.log(error);
    });


  }; //End logoutUser
}]); //End Controller

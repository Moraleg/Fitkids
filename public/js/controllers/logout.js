angular.module('MyApp').controller('logoutCtrl', ['$http', function($http){
  var controller = this;

  this.logoutUser = function(){
    $http({
      method: 'DELETE',
      url: '/sessions'
    }).then(function(response){
      console.log(response);

    }, function(error){
      console.log(error);
    });


  }; //End logoutUser
}]); //End Controller

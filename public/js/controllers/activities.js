// Filter functions adapted from http://stackoverflow.com/questions/23983322/angularjs-checkbox-filter

angular.module('MyApp').controller('ActivitiesController', ['$http', function($http) {
  var ctrl = this;
  ctrl.activities = [];
  ctrl.filter = { minAge: 18 };
  ctrl.ageRange = [];
  ctrl.getActivities = function() {
    $http({
      method: 'GET',
      url: '/activities'
    }).then(function(response) {
      ctrl.activities = response.data;
    }, function(error) {
      console.log('Error');
    });
  };
  // ctrl.getActivities();
  ctrl.noFilter = function(field) {
    let filterObj = Object.assign({}, ctrl.filter[field]);
    // delete filterObj.minAge;
    return Object
    .keys(filterObj)
    .every(function(key) {
      return !filterObj[key];
    });
  };
  ctrl.filterActivity = function(activity) {
    return (ctrl.filter.typeOfExercise[activity.typeOfExercise] || ctrl.noFilter('typeOfExercise')) && (ctrl.filter.weather[activity.weather] || ctrl.noFilter('weather')) && activity.minAge <= ctrl.filter.minAge;
  };
  ctrl.getAgeRange = function(limLow, limHigh) {
    let agesArr = [];
    for (var i = limLow; i <= limHigh; i++) {
      agesArr.push(i);
    }
    ctrl.ageRange = agesArr;
  };
  ctrl.getActivitiesByTitle = function(string){
    $http({
      method: 'POST',
      url: '/activities/search',
      data: { pattern: string }
    }).then(function(response) {
      ctrl.activities = response.data;
    }, function(error) {
      console.log('Error');
    });
  };
  // ctrl.seed = function() {
  //   $http({
  //     method: 'GET',
  //     url: '/activities/seed'
  //   }).then(function(response) {
  //     console.log('Seed successful');
  //   }, function(error) {
  //     console.log('Error');
  //   });
  // }
  // ctrl.seed();
}]);

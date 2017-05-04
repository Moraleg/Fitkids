// Filter functions adapted from http://stackoverflow.com/questions/23983322/angularjs-checkbox-filter

angular.module('MyApp').controller('ActivitiesController', ['$http', '$scope', function($http, $scope) {
  console.log($scope.viewCtrl.sessionData);
  var ctrl = this;
  ctrl.activities = [];
  ctrl.query = { title: "" }
  ctrl.lastQuery = { title: "" }
  ctrl.filter = { minAge: 18 };
  ctrl.newActivity = { typeOfExercise: 'Aerobic', weather: 'Sunny' };
  ctrl.editActivity = {};
  ctrl.newActivityTemplate = { typeOfExercise: 'Aerobic', weather: 'Sunny' };
  ctrl.ageRange = [];
  ctrl.exerciseTypes = [
    { name: 'Aerobic' },
    { name: 'Balance' },
    { name: 'Cardio' },
    { name: 'Flexibility' }
  ];
  ctrl.weatherTypes = [
    { name: 'Sunny' },
    { name: 'Rainy' },
    { name: 'Snow' }
  ];
  ctrl.hasSearched = false;
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
  ctrl.getActivities();
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
  ctrl.getActivitiesByTitle = function(string) {
    if (string.length) {
      if (string === '*') {
        string = '';
        ctrl.query.title = '';
      }
      $http({
        method: 'POST',
        url: '/activities/search',
        data: { pattern: string }
      }).then(function(response) {
        ctrl.lastQuery = Object.assign({}, ctrl.query);
        ctrl.hasSearched = true;
        ctrl.activities = response.data;
      }, function(error) {
        console.log('Error');
      });
    } else {
      ctrl.getActivities();
    }
  };
  ctrl.refreshActivities = function() {
    if (ctrl.hasSearched) {
      ctrl.getActivitiesByTitle(ctrl.lastQuery.title);
    } else {
      ctrl.getActivities();
    }
  };
  ctrl.addNewActivity = function() {
    ctrl.newActivity.creator = $scope.viewCtrl.sessionData;
    $http({
      method: 'POST',
      url: '/activities/new',
      data: ctrl.newActivity
    }).then(function(response) {
      ctrl.newActivity = Object.assign({}, ctrl.newActivityTemplate);
      ctrl.refreshActivities();
    }, function(error) {
      console.log(error);
    });
  };
  ctrl.edit = function(activity){
    ctrl.editActivity = activity;
    $('#activity-form-edit-container').css('display', 'block');  
  };
  ctrl.updateActivity = function() {
    $http({
      method: 'PUT',
      url: '/activities/' + ctrl.editActivity._id,
      data: ctrl.editActivity
    }).then(function(response) {
      ctrl.editActivity = {};
      ctrl.refreshActivities();
    }, function(error) {
      console.log(error);
    });
  };
  ctrl.deleteActivity = function() {
    $http({
      method: 'DELETE',
      url: '/activities/' + ctrl.editActivity._id
    }).then(function(response) {
      ctrl.editActivity = {};
      ctrl.refreshActivities();
    }, function(error) {
      console.log(error);
    });
  };
  ctrl.addToFavorites = function(activity) {
    $http({
      method: 'PUT',
      url: '/activities/' + activity._id + '/favorite/' + $scope.viewCtrl.sessionData._id
    }).then(function(response) {
      $scope.viewCtrl.sessionData = response.data;
    }, function(error) {
      console.log(error);
    });
  };
  ctrl.removeFromFavorites = function(activity) {
    $http({
      method: 'DELETE',
      url: '/activities/' + activity._id + '/favorite/' + $scope.viewCtrl.sessionData._id
    }).then(function(response) {
      $scope.viewCtrl.sessionData = response.data;
    }, function(error) {
      console.log(error);
    });
  };
  ctrl.isFavorite = function(activity) {
    var result = false;
    for (var i = 0; i < $scope.viewCtrl.sessionData.favorites.length; i++) {
      if ($scope.viewCtrl.sessionData.favorites[i]._id.toString() === activity._id.toString()) {
        result = true;
      }
    }
    return result;
  };
  ctrl.getFavorites = function() {
    ctrl.query.title = "";
    ctrl.lastQuery.title = "";
    ctrl.activities = $scope.viewCtrl.sessionData.favorites;
  }
}]);

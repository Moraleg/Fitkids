angular.module('MyApp').controller('showChildrenCtrl', ['$http', function ($http) {
  // initialize variables
  var ctrl = this;
  ctrl.allChildren = [];

  // get data for today
  ctrl.getTodaysActivityLevels = function () {
    // set time stamp for today's date to midnight in preparation for comparison
    var today = new Date;
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    for (var i = 0; i < ctrl.allChildren.length; i++) {
        ctrl.allChildren[i].showEdit = false;

        if (ctrl.allChildren[i].activity.length > 0) {
          for (var j = 0; j < ctrl.allChildren[i].activity.length; j++) {
            // find the activity that corresponds with today's date
            if (today.toJSON() === ctrl.allChildren[i].activity[j].day) {
              ctrl.allChildren[i].todaysActivity = ctrl.allChildren[i].activity[j].minutes;
            }
          }
        } else {
          ctrl.allChildren[i].todaysActivity = 0;
        }
    }
  };

  // function fetches all children of the logged-in parent from database
  ctrl.getAllChildren = function () {
    $http({ // http request to get session data
      method: 'GET',
      url: '/sessions'
    }).then(
      function (response) { // in case of success
        console.log(response); // log response
        if(response.data) {
          $http({ // http request to get children based on logged-in user's id
            method: 'GET',
            url: '/children/'
          }).then(
            function (response) { // in case of success
              console.log(response); // log response
              if (response.data) { // if response contains data
                ctrl.allChildren = response.data // set all children to data
                ctrl.getTodaysActivityLevels();
              } else {
                console.log('sth went wrong'); // log error
              }
            }, function (error) { // in case of failure
              console.log(error); // log error
            }
          )
        }
      },
      function (error) { // in case of failure
        console.log(error); // log error
      });
  };

  ctrl.track = function (element) {
    element.showEdit = true;
  }

  ctrl.addActiveMinutes = function (child) {
    var today = new Date;
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    newActivity = {
      day: today,
      minutes: child.newMinutes
    };

    if (child.activity.length > 0) {
      for (var i = 0; i < child.activity.length; i++) {
        console.log(child.activity[i].day);
        console.log(today.valueOf());
        if (child.activity[i].day === today.toJSON()) {
          child.activity[i].minutes += newActivity.minutes;
          console.log('updating');
        }
      }
    } else {
      child.activity.push(newActivity);
    }

    $http({
      method: 'PATCH',
      url: '/children/' + child._id,
      data: child
    }).then(
      function (response) {
        for (var i = 0; i < ctrl.allChildren.length; i++) {
          if (ctrl.allChildren[i]._id.toString() === response.data._id.toString()) {
                console.log('found it:');
                console.log(ctrl.allChildren[i]);
            ctrl.allChildren[i] = response.data;
            console.log(ctrl.allChildren[i]);
          }
        }
        ctrl.getTodaysActivityLevels();
      }, function (error) {
        console.log(error);
      });
    child.showEdit = false;
  };
}]);

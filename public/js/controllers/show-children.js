angular.module('MyApp').controller('showChildrenCtrl', ['$http', function ($http) {
  // initialize variables
  var ctrl = this;
  ctrl.allChildren = [];
  ctrl.thisChild = {};
  // set time stamp for today's date to midnight
  // this way, all dates will have the exact same time down to the milisecond // and can be compared to today's date
  ctrl.today = new Date();
  ctrl.today.setHours(0);
  ctrl.today.setMinutes(0);
  ctrl.today.setSeconds(0);
  ctrl.today.setMilliseconds(0);

  // get data for today
  ctrl.getTodaysActivityLevels = function () {

    // loops through all all children
    for (var i = 0; i < ctrl.allChildren.length; i++) {
       // adds todaysActivity key to respective child object and initializes it
       // with zero
        ctrl.allChildren[i].todaysActivity = 0;
        ctrl.allChildren[i].showEdit = false; // hide edit option
        if (ctrl.allChildren[i].activity.length > 0) {
          // if there already is an activity in the activity array
          for (var j = 0; j < ctrl.allChildren[i].activity.length; j++) {
            // find the activity that corresponds with today's date
            if (ctrl.today.toJSON() === ctrl.allChildren[i].activity[j].day) {
              ctrl.allChildren[i].todaysActivity = ctrl.allChildren[i].activity[j].minutes; // set todaysActivity to that number
            }
          }
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

  ctrl.track = function (element) { // function allows to toggle edit options
    // for one child at a time
    if (element.showEdit) {
      element.showEdit = false;
    } else {
      element.showEdit = true;
    }
  };

  ctrl.getAllChildren();

  ctrl.addActiveMinutes = function (child) { // function allows to add
    // activity in minutes for current date only

    // holds today's date and minutes from userInput
    newActivity = {
      day: ctrl.today,
      minutes: child.newMinutes
    };

    // updates existing activity value if parent has already added activity
    // levels on current day
    var updateActivity = function () {
      for (var i = 0; i < child.activity.length; i++) { // loop over array
        if (child.activity[i].day === ctrl.today.toJSON()) { // find entries
          // with today's date
          child.activity[i].minutes += newActivity.minutes; // increase
          // activity by new value
          return true; // return true and end loop
        }
      }
      return false // return false since no matches were found
    }

    if (child.activity.length > 0) { // if activity array already holds an
      // activity
      var updated = updateActivity(); // call function above to avoid dublicates
      if (!updated) { // if no previous entry
        child.activity.push(newActivity); // add new entry to array
      }
    } else {
      child.activity.push(newActivity); // if array is empty add new entry
    }

    $http({ // http request to update database entry
      method: 'PATCH',
      url: '/children/' + child._id,
      data: child
    }).then(
      function (response) {
        for (var i = 0; i < ctrl.allChildren.length; i++) { // add update to
          // array holding all children
          if (ctrl.allChildren[i]._id.toString() === response.data._id.toString()) {
            ctrl.allChildren[i] = response.data;
          }
        }
        ctrl.getTodaysActivityLevels();
      }, function (error) {
        console.log(error);
      });
      // close edit
    child.showEdit = false;
  };

  ctrl.showGraph = function (child) {
    // set ctrl.thisChild to selected child
    ctrl.thisChild = child;

    // create range of 7 days starting with current date
    var now = Date.now();
    var dateRange = [];
    for (var i = 0; i < 7; i++) {
      now -= 86400000;
      var modified = new Date(now);
      modified.setHours(24);
      modified.setMinutes(0);
      modified.setSeconds(0);
      modified.setMilliseconds(0);
      dateRange.push(modified);
    }

    // sort range ascending
    // (based on: http://stackoverflow.com/questions/10123953/sort-javascript-object-array-by-date)
    dateRange.sort(function (a,b) {
      return new Date(a) - new Date(b)
    });

    // create labels for x-axis based on date range
    var labels = [];
    for (var i = 0; i < dateRange.length; i++) {
      labels.push(dateRange[i].toDateString());
    }

    // create data for graph
    var activityThisWeek = []; // to store minutes active
    for (var i = 0; i < dateRange.length; i++) {
      var minutes = 0; // initialize with zero
      for (var j = 0; j < child.activity.length; j++) {
        if (child.activity[j].day == dateRange[i].toJSON()) {
          minutes = child.activity[j].minutes; // if entry for day within range
          // present in database, replace 0 with that number
        }
      }
      activityThisWeek.push(minutes) // add to storage array
    }

    var ctx = $("#canvas"); // get canvas element from DOM
    ctx.fillStyle = '#F7F7F7';

    var graphData = { // set data for graph
      labels: labels, // date strings as labels
      datasets: [
        {
          label: "active minutes",
          pointRadius: 0,
          pointHitRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: 'rgba(43,206,197, .7)',
          borderColor: 'rgba(43,206,197, 1)',
          data: activityThisWeek, // activity levels in mins for past 7 days
          fontColor: '#ccc',
          fontFamily: 'Helvetica Neue, sans-serif',
        }
      ]
    };

    var scatterChart = new Chart(ctx, { // draw graph
      type: 'line',
      data: graphData
    });

    $('#graph').show();
  };

}]);

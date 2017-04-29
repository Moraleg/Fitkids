// ------------------------------- ROUTER SET UP -------------------------------

var express = require('express'),
    router = express.Router(),
    // User = require('../controllers/users.js'),
    Activity = require('../models/activities.js');

// -------------------------------- SEED ROUTE ---------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// JUST FOR TESTING PURPOSES! NOTE: To make this work, I commented out the creator key in the activities model! Don't forget to revert!
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var seedData = [
  {
    title: 'This is an exercise',
    description: 'It is so much fun!',
    typeOfExercise: 'aerobic',
    outdoor: 'true',
    weather: 'sunny',
    ageRange: ['Toddler', 'Kindergardener'],
    tags: ['fun', 'splash', 'splish']
  },
  {
    title: 'This is another exercise',
    description: 'It is so much more fun!',
    typeOfExercise: 'anaerobic',
    outdoor: 'false',
    weather: 'rainy',
    ageRange: ['Teen'],
    tags: ['bla', 'splash', 'blo']
  }
];

router.get('/seed', function (req, res) {
  // add seed data to
  Activity.insertMany(seedData, function(error, createdActivities) {
    if (!error) {
      // if no error occurs, redirect to activities routes
      res.redirect('/activities')
    } else {
      // else send error
      res.json(error);
    }
  });
});

// ------------------------------- GET ROUTES ----------------------------------
// tested in browser and with curl
router.get('/', function (req, res) {
  // find all activities in the database
  Activity.find({}, function (error, allActivities) {
    if (!error) {
      // if no error occurs, send array of all found database entries as json
      res.json(allActivities);
    } else {
      // else send error
      res.json(error);
    }
  });
});

// -------------------------------- POST ROUTE ---------------------------------
// tested with curl
router.post('/new', function (req, res)  {
  // Create new database entry based on user input
  Activity.create(req.body, function (error, createdActivity) {
    if(!error) {
      // if no error occurs, send json of createdActivity
      res.json(createdActivity);
    } else {
      // else send error
      res.json(error);
    }
  });
});

// --------------------------------- PUT ROUTE ---------------------------------
// tested with curl
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// NOTE: Why not just findByIdAndUpdate: If we want to run authentication (--> is the user making the put request the creator of the database entry?), we'll need to compare the current user's id to the database entry's value for creator first. If they match, we will can allow an update, if not, we will want to send a 403. We cannot solely rely on the frontend for authentication, since you could also try to use curl to make a PUT request. This is why I opted for this update version. If you don't agree or know a better way to do it, let me know and I'll change it. I wrote the basic conditional for this, but commented it out for now.
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.put('/:id', function (req, res) {
  // find activity to be updated
  Activity.findById(req.params.id, function (error, foundActivity) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // NOTE: just basic logic, fill with correct variable names for authentication!!
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // if logged-in user is author of activity, make update to database entry
    // if (currentUserID === foundActivity.creator) {
      Activity.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (error, updatedActivity) {
        if(!error) {
          // if no error occurs, send updated database entry as json
          res.json(updatedActivity);
        } else {
          // else send error
          res.json(error)
        }
      });
      // if user is NOT the author of activity, send 403
    //} else {
      //res.status(403).send('Forbidden');
    //}
  });
});

// ------------------------------- DELETE ROUTE --------------------------------
// tested with curl
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// NOTE: Why not just findByIdAndRemove: see put route
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.delete('/:id', function (req, res) {
  // find activity to be deleted
  Activity.findById(req.params.id, function (error, foundActivity) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // NOTE: just basic logic, fill with correct variable names for authentication!!
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // if logged-in user is the author of the activity, delete
    // if (currentUserID === foundActivity.creator) {
      Activity.findByIdAndRemove(req.params.id,
        function (error, deletedActivity) {
          // if no error occurs
          if (!error) {
            //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // //NOTE: the following will only work, if  connected to users controller and a user's favorites array holds the IDs of the liked activities! This is why I commented it out for now. Code NOT tested yet! Might contain bugs!
            //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            // // find all users
            // User.find({}, function (error, allUsers) {
            //   // loop through allUsers array
            //   for (var i = 0; i < allUsers.length; i++) {
            //     // loop through favorites array on User object
            //     for (var j = 0; j < allUsers[i].favorites.length; j++) {
            //       // if saved favorite is identical to id of deleted activity
            //       if (allUsers[i].favorites[j] === deletedActivity._id) {
            //         // remove this favorite from array
            //         allUsers[i].favorites.splice(j, 1);
            //       } // closes if
            //     } // closes inner loop
            //   } // closes outer loop
            // }); // closes User.find() and callback
            res.json(deletedActivity)
          } else {
            res.json(error);
          }
      });
      // if user is NOT the author of activity, send 403
    // } else {
      //res.status(403).send('Forbidden');
    // }
  });
});

// ------------------------------- ROUTER EXPORT -------------------------------

module.exports = router;

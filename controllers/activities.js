// ------------------------------- ROUTER SET UP -------------------------------

var express = require('express'),
    router = express.Router(),
    User = require('../models/users.js'),
    Activity = require('../models/activities.js');

// -------------------------------- SEED ROUTE ---------------------------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// JUST FOR TESTING PURPOSES! NOTE: To make this work, I commented out the
// creator key in the activities model! Don't forget to revert!
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var seedData = [
  {
    /* creator: 'insert user id here', */
    title: 'This is an exercise',
    description: 'It is so much fun!',
    typeOfExercise: 'aerobic',
    outdoor: 'true',
    weather: 'sunny',
    ageRange: ['Toddler', 'Kindergardener'],
    tags: ['fun', 'splash', 'splish']
  },
  {
    /* creator: 'insert user id here', */
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

// *** GET all database entries ***
// --> tested in browser and with curl
// --> we might want to limit this to the ten most recent entries or
// sth like that depending on user stories

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

// *** GET all distinct tags ***
// --> tested in browser and with curl

router.get('/tags', function (req, res) {
  // find all distinct tags
  Activity.find().distinct('tags', function (error, distinctTags) {
    // if no error occurs, send tags array back as json
    if (!error) {
      res.json(distinctTags);
    } else {
      // in case of error, send error
      res.json(error);
    }
  });
});


// -------------------------------- POST ROUTE ---------------------------------

// *** CREATE a new activity ***
// --> tested with curl

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

// *** add an existing activity to user's favorites ***
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// NOTE: THIS IS JUST FOR TESTING --> needed this to be able to test if my
// delete route logic also removes deleted activity from users' favorites arrays
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.put('/:id/favorite/:userID', function (req, res) {
  // find activity by id
      User.findByIdAndUpdate(req.params.userID,
        // update by pushing the id of foundActivity into favorites array on user
        { $push: { 'favorites': req.params.id } }, {new: true},
         function (error, updatedUser) {
           if (!error) {
             // if no error occurs, send json of updated user entry
             res.json(updatedUser);
           } else {
             // else send error
             res.json(error);
           }
      });
});


// *** UPDATE an existing activity ***
// --> tested with curl
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// NOTE: Why not just findByIdAndUpdate: If we want to run authorization (-->
// is the user making the put request the creator of the database entry?), we'll
// need to compare the current user's id to the database entry's value for
// creator first. If they match, we will can allow an update, if not, we will
// want to send a 403. We cannot solely rely on the frontend for authorization,
// since you could also try to use curl to make a PUT request. This is why I
// opted for this update version. If you don't agree or know a better way to do
// it, let me know and I'll change it. I wrote the basic conditional for this,
// but commented it out for now.
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.put('/:id', function (req, res) {
  // find activity to be updated
  Activity.findById(req.params.id, function (error, foundActivity) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // NOTE: just basic logic, fill with correct variable names for authorization!!
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // if logged-in user is author of activity, make update to database entry
    // if (req.session.currentuser._id === foundActivity.creator) {
      Activity.findByIdAndUpdate(req.params.id, req.body, {new: true},
        function (error, updatedActivity) {
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
// --> tested with curl
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// NOTE: Why not just findByIdAndRemove: see put route
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.delete('/:id', function (req, res) {
  // find activity to be deleted
  Activity.findById(req.params.id, function (error, foundActivity) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // NOTE: just basic logic, fill with correct variable names for
    // authorization!!
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // if logged-in user is the author of the activity, delete
    // if (req.session.currentuser._id === foundActivity.creator) {
      Activity.findByIdAndRemove(req.params.id,
        function (error, deletedActivity) {
          // if no error occurs
          if (!error) {
            // // find all users
            User.find({}, function (error, allUsers) {
              // loop through allUsers array
              for (var i = 0; i < allUsers.length; i++) {
                // loop through favorites array on User object
                for (var j = 0; j < allUsers[i].favorites.length; j++) {
                  // if saved favorite is identical to id of deleted activity
                  if (allUsers[i].favorites[j] == deletedActivity._id) {
                    // remove this favorite from array
                    allUsers[i].favorites.splice(j, 1);
                    // saves changes
                    allUsers[i].save(function(error) {
                      if (error) {
                        console.log(error);
                      }
                    }); // closes save() + callback
                  } // closes if inside inner loop
                } // closes inner loop
              } // closes outer loop
            }); // closes User.find() and callback
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

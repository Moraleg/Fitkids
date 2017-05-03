//USER CONTROLLER

var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var bcrypt = require('bcrypt');
var Activity = require('../models/activities.js');

//================ROUTES=================

//GET ROUTE
//change for single user not every user
//tested with curl and in the browser
router.get('/', function(req, res){
  User.find({}, function(err, foundUsers){
    res.json(foundUsers);
  });
});

//---------------------------------
//get user by ID
router.get('/:id', function(req, res){
  User.find({user: req.params.id}, function(err, foundUser){ // find user
    // check if session exists and if current user is authorized to view data
    if (req.session.currentuser &&
      req.session.currentuser._id.toString() === foundUser._id.toString()) {
      if (!err) { // if no error occurs ...
        createdUser.password = ''; // password data is cleared out before ...
        res.json(foundUser); // ... user data is send to browser
      } else { // if error occurs ...
        res.json(err); // send error
      }
    }
  });
});

// POST ROUTE
// tested
router.post('/', function(req, res){
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)); //encrypts password
  User.create(req.body, function(err, createdUser){ // creates user
    if (!err) { // if no error occurrs ...
      createdUser.password = ''; // password data is cleared out before ...
      res.json(createdUser); // userData is sent to browser
    } else { // if error occurrs ...
      res.json(err); // error is sent to browser
    }
  });
});

// PATCH ROUTES
// tested
router.patch('/:id', function(req, res) { // user profile update
  User.findById(req.params.id, function(err, foundUser) { // search for user
    // check if session exists and if data is identical to database entry
    if (req.session.currentuser && req.session.currentuser._id.toString() === foundUser._id.toString()) {
      if(!err) { // if no error occurrs ...
        // check if request body contains password information and if the
        // password is at least 8 characters long ( --> also checked in
        // front end, this is to cover curl requests)
          if (req.body.password !== undefined && req.body.password.length >= 8) {
            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)); // encrypt password
            User.findByIdAndUpdate(req.params.id, // update user's password
              { $set: { password: req.body.password } }, {new:true},
              function(err, updatedUser){
                if(!err) { // if no error occurrs ...
                  req.session.currentuser = updatedUser; // save updated
                  // user data in session
                  updatedUser.password = ''; // clear password data
                  res.json(updatedUser); // send user data to browser
                } else { // if error occurrs ...
                  res.json(err); // ... send error
                }
            });
            // check if request body contains user name information and if
            // username is not an empty string or only spaces ( --> also
            // checked in front end, this is to cover curl requests)
          } else if (req.body.username !== undefined && req.body.username.trim() !== '') {
              User.findByIdAndUpdate(req.params.id, // update user's username
              { $set: { username: req.body.username } }, {new:true},
              function(err, updatedUser){
                if(!err) {
                  req.session.currentuser = updatedUser; // save updated
                  // user data in session
                  updatedUser.password = ""; // clear password data
                  res.json(updatedUser); /// send user data to browser
                } else {
                  // if error occurrs ...
                  res.json(err); // send error
                }
            });
          } else {
            // do not allow any other patch requests to this route
            res.status(403).send('Forbidden');
          }
      } else { // if error occurrs ...
        res.json(err); // send error
      }
    } else { // do not allow updates if user is not authorized
      res.status(403).send('Forbidden');
    }
  });
});

//DELETE ROUTE
router.delete('/:id', function(req, res){
  User.findById(req.params.id, function(err, foundUser){ // find user
    if(req.session.currentuser && req.session.currentuser._id.toString() === foundUser._id.toString()){ // check if session exists and if user is
      // authorized to delete this database entry
      if (!err) { // if no error occurrs, delete user
        User.findByIdAndRemove(req.params.id, function(err, deletedUser){
          if (!err) { // if no error occurs, remove all activities authored
            // by the deleted user
            Activity.find({creator: deletedUser._id}).remove(function(err, deletedActivities) {
              console.log(deletedActivities);
            });
            req.session.destroy(function() { // log user out
              res.json({data: 'success'}); // send confirmation that session
              // has been destroyed
            });
          } else { // if error occurs
            res.json(err); // send error
          }
        });
      } else { // if error occurs
        res.json(err);  // send error
      }
    } else { // do not allow updates if user is not authorized
      res.status(403).send('Forbidden');
    }
  });
});

module.exports = router;

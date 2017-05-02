//USER CONTROLLER

var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var bcrypt = require('bcrypt');

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
  User.find({user: req.params.id}, function(err, foundUser){
    // if (req.session.currentuser._id === foundUser._id) {
      if (!err) {
        res.json(foundUser);
      } else {
        res.json(err);
      }
    // }
  });
});

//POST ROUTE
//tested with curl
router.post('/', function(req, res){
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, function(err, createdUser){
    res.json(createdUser);
  });
});

//PATCH ROUTES

// password change
router.patch('/:id', function(req, res) {
  // search for user
  User.findById(req.params.id, function(err, foundUser) {
    // check if session data identical to database entry --> authorization
    // if (req.sessions.currentuser._id === foundUser._id) {
      if(!err) {
        // check if request body contains password information and if the password
        // is at least 8 characters long ( --> also checked in front end, this is to
        // cover curl requests)
          if (req.body.password !== undefined && req.body.password.length >= 8) {
            // encrypt password
            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            // update user's password and respond with information as json
            User.findByIdAndUpdate(req.params.id,
              { $set: { password: req.body.password } }, {new:true},
              function(err, updatedUser){
                if(!err) {
                  // save updated user data in session
                  req.session.currentuser = updatedUser;
                  // remove password before sending response with updatedUser to
                  // the browser (I tried to delete the key, but that did not
                  // work)
                  updatedUser.password = "";
                  res.json(updatedUser);
                } else {
                  // if error, send error
                  res.json(err);
                }
            });
            // check if request body contains user name information and if username
            // is not an empty string or only spaces ( --> also checked in front
            // end, this is to cover curl requests)
          } else if (req.body.username !== undefined &&
            req.body.username.trim() !== '') {
              // update user's username and respond with information as json
              User.findByIdAndUpdate(req.params.id,
              { $set: { username: req.body.username } }, {new:true},
              function(err, updatedUser){
                if(!err) {
                  // save updated user data in session
                  req.session.currentuser = updatedUser;
                  // remove password before sending response with updatedUser to
                  // the browser (I tried to delete the key, but that did not
                  // work)
                  updatedUser.password = "";
                  res.json(updatedUser);
                } else {
                  // if error, send error
                  res.json(err);
                }
            });
          } else {
            // do not allow any other patch requests to this route
            res.status(403).send('Forbidden');
          }
      } else {
        res.json(err);
      }
    // } else {
    //   res.status(403).send('Forbidden');
    // }
  });
});

//DELETE ROUTE
//user delete route needs to loop through existing children and delete those who have this particular user's ObjectId as value listed under key 'parent'
router.delete('/:id', function(req, res){
  User.findById(req.params.id, function(err, deletedUser){
    // if(req.session.currentuser._id === deletedUser._id){
      if (!err) {
        User.findByIdAndRemove(req.params.id, function(err, deletedUser){
          if (!err) {
            res.json(deletedUser);
          } else {
            res.json(err);
          }
        });
      } else {
        res.json(err);
      }
    // } else {
    //   res.status(403).send('Forbidden');
    // }
  });
});

module.exports = router;

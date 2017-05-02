// SESSIONS CONTROLLER //

// DEPENDENCIES //
const express = require('express');
const router = express.Router();
const  bcrypt = require('bcrypt');


// MODELS //
const Users = require('../models/users.js');

// ROUTES //
/* Log In */
router.get('/login/', function(req, res) {
  /* Do we need a route for log in, or will this be an element in our HTML? */
});

/* Get Current User */
/* Route for Angular to get session information? Needs testing when we implement AngularJS */
router.get('/', function(req, res) {
  res.json(req.session.currentuser);
});

/* Create Session */
router.post('/', function(req, res) {
  Users.findOne({ username: req.body.username }, function(err, foundUser) { // Finds user based on login information
    var foundUserBoolean = !!foundUser; // Coerces foundUser to boolean
    if (foundUserBoolean) { // If a user is found in the database...
      if (bcrypt.compareSync(req.body.password, foundUser.password)) { // ...and password matches...
        req.session.currentuser = foundUser; // Saves session info
        res.json({ success: true }); // Sends result
      } else { // If password doesn't match...
        res.json({ success: false }); // Sends result
      }
    } else { // If no matching user is found in the database ...
      res.json({ success: false }); // Sends result
    }
  });
});

/* Destroy Session */
router.delete('/', function(req, res) {
  req.session.destroy(function(){
    res.json({currentStatus: 'logged-out'});
  });
});

// EXPORT //
module.exports = router;

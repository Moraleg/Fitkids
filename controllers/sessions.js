// SESSIONS CONTROLLER //

// DEPENDENCIES //
const express = require('express');
const router = express.Router();

// MODELS //
const Users = require('../models/users.js');

// ROUTES //
/* Log In */
app.get('/login/', function(req, res) {
  /* Do we need a route for log in, or will this be an element in our HTML? */
});

/* Get Current User */
/* Route for Angular to get session information? Needs testing when we implement AngularJS */
app.get('/', function(req, res) {
  res.json(req.session.currentuser);
});

/* Create Session */
app.post('/', function(req, res) {
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
app.delete('/', function(req, res) {
  req.session.destroy(/* Callback goes here */);
});

// EXPORT //
module.exports = router;

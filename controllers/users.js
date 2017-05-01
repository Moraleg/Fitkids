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
router.get('/:userId', function(req, res){
  User.find({user: req.params.userId}, function(err, foundUsers){
    // if (req.session.currentuser._id === foundUsers) {
      if (!err) {
        res.json(foundUsers);
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
  User.create(req.body, function(err, createdUsers){
    res.json(createdUsers);
  });
});

//PATCH ROUTES



// password change
router.put('/:id', function(req, res) {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.findById(req.params.id, function(err, updatedUsers){
    // if(req.sessions.currentuser._id === updatedUsers){
      User.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, updatedUsers){
        if(!err) {
          res.json(updatedUsers);
        } else {
          res.json(err);
        }
      });
    // }
  });
});

//DELETE ROUTE
//user delete route needs to loop through existing children and delete those who have this particular user's ObjectId as value listed under key 'parent'
router.delete('/:id', function(req, res){
  User.findById(req.params.id, function(err, deletedUsers){
    if(req.session.currentuser._id === deletedUsers){
      User.findByIdAndRemove(req.params.id, function(err, deletedUsers){
        res.json(deletedUsers);
      });
    }
  });
});



module.exports = router;

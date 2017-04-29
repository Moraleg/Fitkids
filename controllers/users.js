//USER CONTROLLER

var express = require('express');
var router = express.Router();
var User = require('../models/users.js');
var bcrypt = require('bcrypt');

//================ROUTES=================

//GET ROUTE
//tested with curl and in the browser
router.get('/', function(req, res){
  User.find({}, function(err, foundUsers){
    res.json(foundUsers);
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

//PUT ROUTE
//tested with curl
router.put('/:id', function(req, res){
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, updatedUsers){
    res.json(updatedUsers);
  });
});

//DELETE ROUTE
//tested with curl
router.delete('/:id', function(req, res){
  User.findByIdAndRemove(req.params.id, function(err, deletedUsers){
    res.json(deletedUsers);
  });
});



module.exports = router;

// ------------------------------- ROUTER SET UP -------------------------------

var express = require('express'),
    router = express.Router(),
    Child = require('../models/children.js'),
    User = require('../models/users.js');

// ------------------------------- GET ROUTE -----------------------------------

// *** get all children ***
// --> tested with curl
// find all child entries for a specific parent in the database
// --> parentId = parent ObjectId
router.get('/', function (req, res) {
  if (req.session.currentuser) {
    Child.find({parent: req.session.currentuser}, function(err, foundChildren) {
          if (!err) {
            res.json(foundChildren);
          } else {
            res.json(err);
          }
    }); // closes Child.find and callback
  } else {
    res.status(401).send('Unauthorized');
  }
}); // closes get route function

// ------------------------------- POST ROUTE ----------------------------------
// *** create a new child ***
// --> tested with curl
router.post('/', function (req, res) {
  // set logged-in user as parent
  if (req.session.currentuser) {
    req.body.parent = req.session.currentuser._id
    Child.create(req.body, function (err, createdChild) {
      if(!err) {
        res.json(createdChild);
      } else {
        res.json(err);
      }
    }); // closes Child.create and callback
  } else {
    res.json({session: false});
  }
}); // closes post route function

// ------------------------------- PATCH ROUTE ---------------------------------

router.patch('/:id', function (req, res) {
  Child.findById(req.params.id, function(err, foundChild) {
    if(!err) {
      if (req.session.currentuser && req.session.currentuser._id.toString() === foundChild.parent.toString()) {
        if (req.body.activity !== undefined) {
          // ADD OR EDIT NEW ACTIVITY
          Child.findByIdAndUpdate(req.params.id,
            { $set: {activity: req.body.activity} }, {new: true}, function(err, updatedChild) {
              if (!err) {
                res.json(updatedChild)
              } else {
                res.json(err);
              }
          }); // closes findByIdAndUpdate and callback for activity
        } else { // no other updates are allowed!
          res.status(403).send('Forbidden');
        }
      } else {
        res.status(403).send('Forbidden');
      }
    } else {
     res.json(err);
   }
  }); // closes findById and callback
}); // closes patch route function

// ------------------------------- ROUTER EXPORT -------------------------------

module.exports = router;

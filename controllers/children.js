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
  Child.find({parent: req.session.currentuser}, function(err, foundChildren) {
    // if (req.session.currentuser && req.session.currentuser._id.toString() === foundChildren.parent.toString()) {
        if (!err) {
          res.json(foundChildren);
        } else {
          res.json(err);
        }
    // } else {
    //   res.status(403).send('Forbidden');
    // }
  }); // closes Child.find and callback
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

// *** update activity OR name OR number of badges ***
// --> tested with curl
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// NOTE: We will have to have completely different - independent - updates (one for
// name, one for activity, one for badges) on the front end side.
// They all post to this route - but never at the same time!
// Angular will also have handle updates and edits for activities and then send the // ENTIRE array. I chose to do it this way, because the patch route would have
// otherwise gotten too complicated and illegible. We can also handle deleting an // activity that way and just splice it out of the array in Angular and then patch.
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.patch('/:id', function (req, res) {
  console.log(req.body);
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
        } else if (req.body.name !== undefined) {
          // UPDATE NAME
          Child.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name } }, {new: true}, function(err, updatedChild) {
              if (!err) {
                res.json(updatedChild)
              } else {
                res.json(err);
              }
          }); // closes findByIdAndUpdate and callback for name
        } else if (req.body.numberOfBadges !== undefined) {
          Child.findByIdAndUpdate(req.params.id,
            { $set: {numberOfBadges: req.body.numberOfBadges} }, {new: true},
            function (err, updatedChild) {
              if (!err) {
                res.json(updatedChild)
              } else {
                res.json(err);
              }
          }); // closes findByIdAndUpdate and callback for numberOfBadges
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

// -------------------------------- DELETE ROUTE -------------------------------

// *** DELETE child ***
// --> tested with curl
router.delete('/:id', function (req, res) {
  Child.findById(req.params.id, function(err, foundChild) {
    if(!err) {
      // if (req.session.currentuser._id === foundChild.parent) {
        Child.findByIdAndRemove(req.params.id, function (err, deletedChild) {
          if(!err) {
            res.send(deletedChild);
          } else {
            res.send(err);
          }
        }); // closes findByIdAndRemove and callback
      // } else {
      //   res.status(403).send('Forbidden');
      // }
    } else {
     res.json(err);
    }
  }); // closes findByID and callback
}); // closes delete route function

// ------------------------------- ROUTER EXPORT -------------------------------

module.exports = router;

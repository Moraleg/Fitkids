var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var childSchema = new Schema({
  parent: {type: ObjectId, required: true},
  name: {type: String, required: true},
  numberOfBadges: Number,
  activity: [{
    day: { type: Date, default: Date.now },
    minutes: Number, default: 0
  }]
});

var Child = mongoose.model('Child', childSchema);

module.exports = Child;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// NOTE: Given this structure, we will probably have to make the following
// changes to the user model and routes:
// - user model does no longer need 'stats'
// - user delete route needs to loop through existing children and delete those
// who have this particular user's ObjectId as value listed under key 'parent'
// - updates should not be affected since we're only connecting our database
// entries using ObjectIds
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

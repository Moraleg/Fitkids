//USER MODEL

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true },
  password: {type: String, required: true},
  // NOTE: I had to remove the ObjectId keyword from the array to make this work for
  // testing my routes properly, bc req.params.id comes back as string
  // Revert after REVIEW!
  favorites: [],
  stats: [{
    child: String,
    points: Number,
    completedActivities: [String]
  }]
});

var User = mongoose.model('User', userSchema);
module.exports = User;

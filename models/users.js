//USER MODEL

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true },
  password: {type: String, required: true},
  favorites: [],
  stats: [{
    child: String,
    points: Number,
    completedActivities: [String]
  }]
});

var User = mongoose.model('User', userSchema);
module.exports = User;

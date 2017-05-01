//USER MODEL

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {type: String, required: true, unique: true },
  password: {type: String, required: true},
  favorites: [{type: Schema.Types.ObjectId}],
  // stats: [{ //may not need this given children model
  //   child: String,
  //   points: Number,
  //   completedActivities: [String]
  // }]
});

var User = mongoose.model('User', userSchema);
module.exports = User;

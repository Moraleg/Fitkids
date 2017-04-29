var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var activitySchema = new Schema({
  creator: {type: Object, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  typeOfExercise: String,
  outdoor: {type: Boolean, required: true} ,
  weather: [{type: String, required: true}],
  ageRange: [{type: String , required: true}],
  tags: [String]
});

var Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

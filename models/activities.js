var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var activitySchema = new Schema({
  // NOTE: I had to remove the ObjectId keyword from the array to make this work for
  // testing my routes properly, bc req.params.id comes back as string
  // Revert after REVIEW!
  creator: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  typeOfExercise: String,
  weather: {type: String, required: true},
  minAge: {type: Number , required: true},
  date: {type: Date, default: Date.now}
  // outdoor: {type: Boolean, required: true} ,
  // tags: [String]
});

var Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

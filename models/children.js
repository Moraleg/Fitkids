var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var childSchema = new Schema({
  parent: {type: ObjectId, required: true},
  name: {type: String, required: true},
  numberOfBadges: Number,
  activity: {
    day: { type: Date, default: Date.now },
    minutes: Number, default: 0
  }
});

var Child = mongoose.model('Child', childSchema);

module.exports = Child;

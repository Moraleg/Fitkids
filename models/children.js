var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var childSchema = new Schema({
  parent: {type: Schema.Types.ObjectId, required: true},
  name: {type: String, required: true},
  activity: [{
    day: { type: Date, default: Date.now },
    minutes: {type: Number, default: 0}
  }]
});

var Child = mongoose.model('Child', childSchema);

module.exports = Child;

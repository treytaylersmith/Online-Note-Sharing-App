const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  times: [{
    type: String,
    required: true,
  }],

  assignments: {        //POSSIBLY CHANGE TO DATE OBJECT FOR CALENDAR INTERACTIVITY
    type: Int,
    default: 0
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

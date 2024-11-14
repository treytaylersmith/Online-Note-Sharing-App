const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  
  startDate: {
    type: Date,
    required: true
  },
  endDate:{
    type: Date,
    required: true
  },

  assignments: {        //POSSIBLY CHANGE TO DATE OBJECT FOR CALENDAR INTERACTIVITY
    type: Number,
    default: 0
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

const mongoose = require('mongoose');

const { Schema } = mongoose;

const dateToString = (timestamp) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(timestamp).toLocaleDateString('en-US', options);  // MM/DD/YYYY
};

const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  
  startDate: {
    type: Date,
    required: true,
    get: (timestamp) => dateToString(timestamp), // Apply the custom date format
  },
  endDate:{
    type: Date,
    required: true,
    get: (timestamp) => dateToString(timestamp), // Apply the custom date format
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

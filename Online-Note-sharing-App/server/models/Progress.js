const mongoose = require('mongoose');

const { Schema } = mongoose;

const progressSchema = new Schema({

  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignmentsDone: {
    type: Int,
    default: 0
  }
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;

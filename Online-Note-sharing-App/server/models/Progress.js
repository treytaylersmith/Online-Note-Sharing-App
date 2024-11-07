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
progressSchema.virtual('percentageDone').get(function() {
  
    return this.courseId ? (this.assignmentsDone / this.courseId.assignments) * 100 : 0;
  });
  
progressSchema.set('toJSON', { virtuals: true });
progressSchema.set('toObject', { virtuals: true });
const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;

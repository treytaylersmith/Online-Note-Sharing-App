const mongoose = require("mongoose");

// Helper function to format date as MM/DD/YYYY
const dateToString = (timestamp) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(timestamp).toLocaleDateString('en-US', options);  // MM/DD/YYYY
};

const { Schema } = mongoose;

const noteSchema = new Schema({
  noteAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: "You need to type something!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateToString(timestamp), // Apply the custom date format
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;

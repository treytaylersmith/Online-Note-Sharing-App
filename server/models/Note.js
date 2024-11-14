const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat");
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
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;

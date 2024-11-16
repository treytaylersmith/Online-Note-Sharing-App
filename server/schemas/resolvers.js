const { Course, Note, User, Progress, Category } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const generateToken = require('../utils/genarateToken');
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw AuthenticationError("you're not logged in");
    },
    categories: async () => {
      return await Category.find();
    },
    coursesByCategory: async (parent, { category }) => {
      return await Course.find({ category: category });
    },
    courses: async () => {
      return await Course.find().populate("notes");
    },
    course: async (parent, { _id }) => {
      return await Course.findById(_id).populate("notes");
    },
    users: async () => {
      return await User.find();
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate("courses");

        return user;
      }

      throw AuthenticationError;
    },
    notes: async (parent, { username }, context) => {
      return await Note.find({ noteAuthor: username });
    },
    getNotesByCourse: async (parent, { courseId }) => {
      try {
        const course = await Course.findById(courseId).populate("notes");
        if (!course) {
          throw new Error("Course not found");
        }
        return course.notes;
      } catch (error) {
        throw new Error("Error fetching notes: " + error.message);
      }
    },
    progressByUserAndCourse: async (parent, { userId, courseId }, context) => {
      if (context.user) {
        const progress = await Progress.findOne({ userId, courseId });
        return progress ? progress.percentageDone : 0; // Return 0 if no progress found
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (err) {
        console.log(err);
      }
    },
    updateUser: async (_, { id, username, email }) => {
      console.log(username);
      console.log(id)
      console.log(email)
      try {
        // Set up an object for the fields that need to be updated
        const updateFields = {};
        if (username) updateFields.username = username;  // Update to 'username' instead of 'name'
        if (email) updateFields.email = email;
        

        // Update the user using findByIdAndUpdate
        const updatedUser = await User.findByIdAndUpdate(
          id, 
          updateFields, 
          { new: true, runValidators: true } // 'new' returns the updated document, 'runValidators' ensures validation
        );
        console.log(updatedUser)
        const token = signToken(updatedUser.username,updatedUser.email,updatedUser._id);
        // If the user doesn't exist, throw an error
        if (!updatedUser) {
          throw new Error('User not found');
        }
    
         
        console.log({token, updatedUser})// Generate token for the updated user
        return { token, updatedUser };
      } catch (err) {
        console.error('Error updating user:', err);
        throw new Error('Failed to update user');
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
          throw AuthenticationError;
        }

        const correctPw = await user.isCorrectPassword(password);
        console.log(correctPw);
        if (!correctPw) {
          throw AuthenticationError;
        }

        const token = signToken(user);

        return { token, user };
      } catch (err) {
        console.log(err);
      }
    },
    addNote: async (parent, { text, noteAuthor, courseId }) => {
      try {
        // 1. Create the note
        const newNote = await Note.create({ text, noteAuthor });
        console.log(newNote);
  
        // 2. Find the course by courseId and update the notes array with the new note
        const updatedCourse = await Course.findByIdAndUpdate(
          courseId,
          { $push: { notes: newNote._id } }, // Add the note's _id to the notes array
          { new: true }
        ).populate("notes");
  
        // 3. Return the newly created note (you can adjust the return object if needed)
        return newNote;
      } catch (err) {
        console.error("Error adding note to course:", err);
        throw new Error("Error adding note to course");
      }
    },
    addCourse: async (parent, args) => {
      return await Course.create(args);
    },
    enrollUserProgress: async (parent, { courseId, userId }, context) => {
      try {
        // 1. Find the user by userId
        const user = await User.findById(userId);
  
        if (!user) {
          throw new Error('User not found');
        }
  
        // 2. Check if the user is already enrolled in the course
        if (user.courses.includes(courseId)) {
          throw new Error('User is already enrolled in this course');
        }
  
        // 3. Add the courseId to the user's courses array
        user.courses.push(courseId);
        await user.save(); // Save the user with the updated courses list
  
        // 4. Create a progress entry for this user and course
        const progress = await Progress.create({
          userId: user._id,
          courseId: courseId,
          assignmentsDone: 0, // Initialize with no assignments done
          percentageDone: 0, // Initialize with 0% progress
        });
  
        // 5. Return the updated user data (optional)
        return user;
      } catch (error) {
        console.error('Error enrolling user in course:', error);
        throw new Error('Error enrolling user in course');
      }
    },
    updateProgress: async (parent, { _id, assignmentsDone }) => {
      return await Progress.findByIdAndUpdate(
        _id,
        { $inc: { assignmentsDone: assignmentsDone } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;

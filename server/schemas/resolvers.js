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
        const token = signToken(updatedUser);
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
    addNote: async (parent, args) => {
      return await Note.create(args);
    },
    addCourse: async (parent, args) => {
      return await Course.create(args);
    },
    enrollUserProgress: async (parent, args) => {
      return await Progress.create(args);
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

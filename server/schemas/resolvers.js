const {Course, Note, User, Progress} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query:{
    courses: async ()=>{
      return await Course.find();
    },
    course: async (parent, {_id}) =>{
      return await Course.findById(_id);
    },
    users: async() =>{
      return await User.find();
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('courses');

        return user;
      }

      throw AuthenticationError;
    },
    notes: async (parent, { username }, context) => {
      
        return await Note.find({ noteAuthor: username });
      
    },
    getNotesByCourse: async (parent, { courseId }) => {
      try {
        const course = await Course.findById(courseId).populate('notes');
        if (!course) {
          throw new Error('Course not found');
        }
        return course.notes;
      } catch (error) {
        throw new Error('Error fetching notes: ' + error.message);
      }
    },
    progress: async (parent, {_id}, context) =>{
      if(context.user){
        return await Progress.findById(_id);
      }
    }
  },
  Mutation: {
    addUser: async (parent, args)=>{
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addNote: async(parent, args)=>{
      return await Note.create(args);
    },
    addCourse: async(parent, args)=>{
      return await Course.create(args);
    },
    enrollUserProgress: async(parent, args)=>{
      return await Progress.create(args);
    },
    updateProgress: async (parent, {_id, assignmentsDone})=>{
      return await Progress.findByIdAndUpdate(
        _id,
        {$inc: {assignmentsDone: assignmentsDone}},
        {new: true}
      );

    }
  }
  
}

module.exports = resolvers
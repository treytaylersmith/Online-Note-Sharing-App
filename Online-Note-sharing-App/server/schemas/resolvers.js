const {Course, Note, User} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query:{
    courses: async ()=>{
      return await Course.find();
    },
    course: async (parent, {_id}) =>{
      return await Course.findById(_id);
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('courses');

        return user;
      }

      throw AuthenticationError;
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
    getUserCourseProgress: async (parent, {courseId}, context) =>{
      if (context.user) {
        const result = await Course.aggregate([])

        return user;
      }

      throw AuthenticationError;
    }
  },
  
}

module.exports = resolvers
const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    courses: [Course]
  }

  type Note {
    _id: ID!
    text: String!
    noteAuthor: String!
    createdAt: String!

  }

  type Progress{
    _id: ID!
    courseId: Course!
    userId: User!
    assignmentsDone: Int
    percentageDone: Int
  }

  type Course{
    _id: ID!
    name: String!
    startDate: String!
    endDate: String!
    assignments: Int!
    notes: [Note]
  }

  type Category {
    _id: ID
    name: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    categories: [Category]
    courses: [Course]
    coursesByCategory(category: ID!): [Course]
    course(_id: ID!): Course
    users: [User]
    user: User
    notes(username: String): [Note]
    getNotesByCourse(courseId: ID!): [Note]
    progressByUserAndCourse(userId: ID!, courseId: ID!): Progress
    me: User

  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addNote(text: String!, noteAuthor: String!): Note
    addCourse(
      name: String!
      startDate: String!
      endDate: String!
      assignments: Int
    ): Course
    enrollUserProgress(
      courseId: ID!
      userId: ID!
    ): User
    updateProgress(assignmentsDone: Int!): Progress
    updateUser(username: String!, email:String!, password: String!): Auth
  }
`;

module.exports = typeDefs;

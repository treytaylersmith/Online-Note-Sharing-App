const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    courses: [Course]
  }

  type Note {
    _id: ID
    text: String!
    noteAuthor: String!
    createdAt: String!

  }

  type Progress{
    _id: ID!
    courseId: Course!
    userId: User!
    assignmentsDone: Int
  }

  type Course{
    _id: ID!
    name: String!
    startDate: String!
    endDate: String!
    assignments: Int!
    notes: [Note]
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    courses: [Courses]
    course: Course
    users: [User]
    user(user: User): User
    notes(username: String): [Note]
    getNotesByCourse(courseId: ID!): [Note]
    progress: Progress
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addNote(text: String!, noteAuthor: String!): Note
    addCourse(
      name: String!
      times String!
      assignments: Int
    )
    addNote(
      courseId:ID!
      text: String!
      noteAuthor: String!
    ): Course
    enrollUserProgress(
      courseId: ID!
      userId: ID!
    ): User
    updateProgress(assignmentsDone: Int!)
    
  }
`;

module.exports = typeDefs;

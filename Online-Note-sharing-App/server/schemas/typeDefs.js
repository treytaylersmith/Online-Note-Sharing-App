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
    users: [User]
    user(username: String!): User
    notes(username: String): [Note]
    getNotesByCourse(courseId: ID!): [Note]
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
    enrollUser(
      courseId: ID!
      userId: ID!
    ): User
    getNotesByCou
    
  }
`;

module.exports = typeDefs;

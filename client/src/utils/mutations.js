import {gql} from '@apollo/client';

export const ADD_COURSE = gql`
mutation addCourse($times: String!, $endDate: String!, $startDate: String!, $assignments: Int, $name: String!) {
  addCourse(times: $times, endDate: $endDate, startDate: $startDate, assignments: $assignments, name: $name) {
    _id
    assignments
    startDate
    endDate
    name
  }
}
`

export const ADD_NOTE = gql`
mutation AddNote($text: String!, $noteAuthor: String!, $courseId: ID!) {
  addNote(text: $text, noteAuthor: $noteAuthor, courseId: $courseId) {
    _id
    createdAt
    noteAuthor
    text
  }
}
`

export const  ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    user{
    _id
    username
    email
    }
    token
  }
}`

export const ENROLL_USER_COURSE = gql`
  mutation enrollUserProgress($courseId: ID!, $userId: ID!) {
    enrollUserProgress(courseId: $courseId, userId: $userId) {
      _id
      username
      email
      courses {
        _id
        
      }
    }
  }
`;


export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user{
      _id
      username
      email
    }
  }
}`

export const UPDATE_PROGRESS = gql`
mutation updateProgress($assignmentsDone: Int!) {
  updateProgress(assignmentsDone: $assignmentsDone) {
    assignmentsDone
    courseId {
      _id
      name
    }
    userId {
      _id
      username
    }
    percentageDone
  }
}`

export const UPDATE_USER = gql`
mutation Mutation($updateUserId: ID!, $username: String, $email: String) {
  updateUser(id: $updateUserId, username: $username, email: $email) {
    token
    user {
      _id
      courses {
        _id
        endDate
        name
      }
      email
      username
    }
  }
}
`;


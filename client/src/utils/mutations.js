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
mutation Mutation($text: String!, $noteAuthor: String!) {
  addNote(text: $text, noteAuthor: $noteAuthor) {
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
    _id
    username
    email
  }
}`

export const ENROLL_USER_COURSE = gql`
mutation enrollUserProgress($courseId: ID!, $userId: ID!) {
  enrollUserProgress(courseId: $courseId, userId: $userId) {
    courses {
      _id
      name
    }
    _id
    username
    email
  }
}`

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
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
mutation updateUser($username: String!, $email: String!, $password: String!) {
  updateUser(username: $username, email: $email, password: $password) {
      user {
      username
      email
      _id
    }
    token
  }
}`
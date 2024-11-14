import {gql} from '@apollo/client';

export const QUERY_ALL_COURSES = gql`
query getCourses {
  courses {
    _id
    name
    assignments
    endDate
    startDate
  }
}
`

export const QUERY_COURSE = gql`
query getCourse($id: ID!) {
  course(_id: $id) {
    _id
    assignments
    endDate
    name
    notes {
      _id
      createdAt
      noteAuthor
      text
    }
    startDate
  }
}
`

export const QUERY_COURSE_NOTES = gql`
query getCourseNotes($courseId: ID!) {
  getNotesByCourse(courseId: $courseId) {
    _id
    text
    noteAuthor
    createdAt
  }
}
`

export const GET_PROGRESS = gql`
  query GetProgress($userId: ID!, $courseId: ID!) {
    progressByUserAndCourse(userId: $userId, courseId: $courseId)
  }
`;

export const QUERY_USER = gql`
query getUser {
  user {
    _id
    courses {
      _id
      assignments
      endDate
      name
      startDate
    }
    email
    username
  }
}`

export const QUERY_CATEGORIES = gql`
query Categories {
  categories {
    name
    _id
  }
}
`

export const QUERY_COURSE_BY_CATEGORY = gql`
query Categories($category: ID!) {
  coursesByCategory(category: $category) {
    _id
    startDate
    assignments
    endDate
    name
  }
}
`
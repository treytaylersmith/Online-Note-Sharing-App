import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ENROLL_USER_COURSE, ADD_NOTE } from '../../utils/mutations';
import { QUERY_COURSE } from '../../utils/queries';
import AuthService from '../../utils/auth';  // Import your AuthService

function Course() {
  const loggedIn = AuthService.loggedIn(); // Checks if there's a valid token
  const user = loggedIn ? AuthService.getProfile() : null; // Retrieve the user profile if logged in
  console.log(user)
  const { _id } = useParams();
  const { loading, error, data } = useQuery(QUERY_COURSE, {
    variables: { id: _id },
  });

  // State to handle the visibility of the note form
  const [isNoteFormVisible, setIsNoteFormVisible] = useState(false);
  const [noteText, setNoteText] = useState('');
  
  // State for enrollment
  const [enrollUser] = useMutation(ENROLL_USER_COURSE);
  const [addNote] = useMutation(ADD_NOTE);

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.course) {
    return <div>No course data found for the provided ID.</div>;
  }

  // Function to handle enrolling the user
  const handleEnroll = async () => {
    try {
      const userId = user.data._id; 
      console.log(userId);
      const response = await enrollUser({ variables: { courseId: _id, userId } });

      // After enrolling the user, update the UI with the new courses list
      const enrolledCourse = response.data.enrollUserProgress.courses.find(course => course._id === _id);
      if (enrolledCourse) {
        alert(`Successfully enrolled in the course!`);
        window.location.reload();
      } else {
        alert('Failed to enroll in the course.');
      }
    } catch (error) {
      console.error('Error enrolling user:', error);
      alert('Failed to enroll in the course.');
    }
  };

  // Handle the note submission
  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(_id)
      // Create a note and associate it with the course
      const note = await addNote({
        variables: {
          text: noteText,
          noteAuthor: user.data.username,
          courseId: _id,  // Pass courseId to associate the note with the course
        },
      });

      console.log("Note added:", note);
      alert('Note added successfully!');
      setIsNoteFormVisible(false); // Hide the note form
      setNoteText(''); // Clear the note input

      // Reload course data to reflect the newly added note
      window.location.reload(); // Ideally, you could update the notes in the state directly
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Failed to add note.');
    }
  };

  return (
    <div>
      <h1>{data.course.name}</h1>
      <p>ID: {data.course._id}</p>
      <p>Assignments: {data.course.assignments}</p>
      <p>Start Date: {data.course.startDate}</p>
      <p>End Date: {data.course.endDate}</p>

      {/* Enroll button */}
      <button className="btn btn-primary" onClick={handleEnroll}>
        Enroll in Course
      </button>

      {/* Toggle button for note form */}
      <button
        className="btn btn-secondary ms-3"
        onClick={() => setIsNoteFormVisible(!isNoteFormVisible)}
      >
        Add Note
      </button>

      {/* Conditionally render the note form */}
      {isNoteFormVisible && (
        <form onSubmit={handleNoteSubmit}>
          <div className="mb-3">
            <label htmlFor="noteText" className="form-label">
              Note Text
            </label>
            <textarea
              id="noteText"
              className="form-control"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Note
          </button>
        </form>
      )}

      {/* Render the course notes */}
      <div>
        <h2>Notes:</h2>
        {data.course.notes.length === 0 ? (
          <p>No notes available for this course.</p>
        ) : (
          data.course.notes.map((note) => (
            <div key={note._id}>
              <p>{note.createdAt}</p>
              <p>{note.noteAuthor}</p>
              <p>{note.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Course;

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import { QUERY_USER } from '../../utils/queries';
import ListItem from '../ListItem';
import AuthService from '../../utils/auth';

const User = () => {
  const { _id } = useParams(); // Get user ID from URL params

  // Fetch user data with the QUERY_USER query
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { id: _id },
  });

  // The current user data
  const user = data?.user || {};

  // State for editing the profile
  const [formData, setFormData] = useState({
    username: user.username || '', // Use 'username' instead of 'name'
    email: user.email || '',
  });

  // State to toggle the edit profile form
  const [isEditing, setIsEditing] = useState(false);

  // Apollo mutation to update the user profile
  const [updateUser] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (data && data.user) {
      // Set the user data into the form fields
      setFormData({
        username: data.user.username, // Use 'username' instead of 'name'
        email: data.user.email,
      });
    }
  }, [data]);

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting update with data:", formData);
      console.log("User ID:", _id);

      // Trigger the UPDATE_USER mutation
      const response = await updateUser({
        variables: {
          updateUserId: _id, // Use updateUserId instead of id to match the mutation
          username: formData.username,
          email: formData.email,
        },
      });

      // Check for the mutation response
      console.log('Updated user data:', response);

      // Retrieve the updated token from the response (assuming the server returns a new token)
      const updatedToken = response.data.updateUser.token;  // Adjust based on actual response shape

      if (updatedToken) {
        // Update the token in localStorage
        AuthService.login(updatedToken);

        // Optionally, update the user profile in state or redirect the user
        alert('Profile updated successfully!');
      } else {
        alert('Failed to retrieve updated token.');
      }

      // Optionally refresh the page or update the UI without reloading
      // window.location.reload(); // You can comment this out if you prefer not to reload the page

    } catch (err) {
      console.error('Error updating profile', err);
      alert('Failed to update profile.');
    }
  };

  // Loading state while the query is fetching
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="card-header">{user.username}</h2> {/* Display 'username' instead of 'name' */}

      <h3>Enrolled Courses</h3>
      <ul className="me-4 list-unstyled">
        {user.courses?.map((course) => (
          <ListItem key={course._id}>
            {course.name}
            {/* Link to the detailed page of the course */}
            <Link to={`/course/${course._id}`} className="badge bg-primary rounded-pill">
              See More
            </Link>
          </ListItem>
        ))}
      </ul>

      <div className="my-4 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        {/* Button to toggle the Edit Profile form */}
        {!isEditing ? (
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        ) : (
          <>
            <h3>Edit Profile</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label"> {/* Update input label to 'username' */}
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"  
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setIsEditing(false)} // Close the form without saving
              >
                Cancel
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default User;

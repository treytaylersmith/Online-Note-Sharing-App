import { Link } from 'react-router-dom';
import Navbar from './Header/Navbar';
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import AuthService from '../utils/auth';  // Import your AuthService

export default function Nav() {
  // Use AuthService to check if the user is logged in
  const loggedIn = AuthService.loggedIn(); // Checks if there's a valid token
  const user = loggedIn ? AuthService.getProfile() : null; // Retrieve the user profile if logged in



  return (
    <Navbar
      links={[
        <Link key={1} className="nav-link text-light" to="/">
          Home
        </Link>,
        !loggedIn ? (
          <Link key={2} className="nav-link text-light" to="/login">
            Login
          </Link>
        ) : null,
        <Link key={3} className="nav-link text-light" to="/courseList">
          Course List
        </Link>,
        loggedIn ? (
          <Link key={4} className="nav-link text-light" to={`/user/${user.data._id}`}>
            Profile
          </Link>
        ) : (
          <Link key={4} className="nav-link text-light" to="/signup">
            Signup
          </Link>
        ),
        loggedIn ? (
          <Link key={5} className="nav-link text-light" to="/logout" onClick={() => AuthService.logout()}>
            Logout
          </Link>
        ) : null,
      ]}
    />
  );
}

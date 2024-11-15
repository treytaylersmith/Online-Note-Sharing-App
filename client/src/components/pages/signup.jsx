import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.userName
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <Link to="/login">← Go to Login</Link>
      <div className="d-flex justify-content-center align-items-center vh-50">
      <div className="card p-5 shadow-lg" style={{maxWidth: '600px', width: '100%'}}>
      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="firstName">First Name:</label>
          <input className="form-control"
            placeholder="User Name"
            name="userName"
            type="userName"
            id="userName"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label"htmlFor="email">Email:</label>
          <input className="form-control"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label"htmlFor="pwd">Password:</label>
          <input className="form-control"
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button className="btn btn-primary w-100" type="submit">Submit</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Signup;

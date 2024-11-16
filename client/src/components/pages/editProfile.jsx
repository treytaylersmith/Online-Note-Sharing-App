import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { UPDATE_USER } from '../../utils/mutations';

function editProfile(props) {
  const [formState, setFormState] = useState({ username: ' ', email: '', password: '' });
  const [updateUser] = useMutation(UPDATE_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await updateUser({
      variables: {
        email: props.email,
        password: formState.password,
        username: formState.username
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
      
      <div className="d-flex justify-content-center align-items-center vh-50">
      <div className="card p-5 shadow-lg" style={{maxWidth: '600px', width: '100%'}}>
      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="firstName">First Name:</label>
          <input className="form-control"
            placeholder="User Name"
            name="username"
            type="username"
            id="username"
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
        <div>
          <p className="text-center mt-3">Already have an Account?<span className="p-2"><Link to="/login">Login</Link></span></p>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Signup;

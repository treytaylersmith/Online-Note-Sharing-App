import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await login({
        variables: { email: formState.email, password: formState.password },
      });
      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.log("Apollo Error:", e);
      if (e.graphQLErrors) {
        console.log("GraphQL Errors:", e.graphQLErrors);
      }
      if (e.networkError) {
        console.log("Network Error:", e.networkError);
      }
    }
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
      
      <div className="d-flex justify-content-center  vh-50">
      <div className="card p-5 shadow-lg" style={{maxWidth: '600px', width: '100%'}}>
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address:</label>
          <input className="form-control"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pwd">Password:</label>
          <input className="form-control"
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
          <button className="btn btn-primary w-100" type="submit">Submit</button>
        </div>
        <div>
          <p className="text-center mt-3">Don't have an Account?<span className="p-2"><Link to="/signup">Signup</Link></span></p>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
}

export default Login;

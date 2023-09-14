import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auths/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    // save the auth token and redirect
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged in Succesfully", "Success");
      history("/");
    } else {
      props.showAlert("Invalid Details", "Danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-3">
      <div className="welcome-container">
        <div className="welcome-content">
        <h1>Welcome to Our To-Do Web App</h1>
          <h6>Create Your personal To Do list with View, Delete and Update Feature</h6>
          <p>Kindly Signup If you dont have any Account or login Directly</p>
        </div>
      </div>
      <h3>Log In to continue to iNotebook</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credentials.email}
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            id="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;

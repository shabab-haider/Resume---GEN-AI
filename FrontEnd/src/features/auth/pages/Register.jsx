import React, { useState } from "react";
import "../auth.style.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { loading, registerHandler } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    await registerHandler({ username, email, password });
    navigate("/");
  };
  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="username"
              name="username"
              id="username"
              placeholder="Enter  username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
            />
          </div>
          <button className="button primary-button" type="submit">
            Register
          </button>
          <p>
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;

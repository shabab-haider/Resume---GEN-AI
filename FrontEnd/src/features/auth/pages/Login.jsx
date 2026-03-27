import React, { useState } from "react";
import "../auth.style.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, loginHandler } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    await loginHandler({ email, password });
    navigate("/");
  };
  if (loading) {
    return (
      <main>
        <h1>Loading....</h1>
      </main>
    );
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
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
            Login
          </button>
          <p>
            Don't have an account? <Link to={"/register"}>Register</Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;

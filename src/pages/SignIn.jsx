import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      // If login is successful, redirect user to dashboard or home page
      console.log("Login successful:", response.data);

      const token = response.data.token;

      localStorage.setItem("token", token);
      navigate("/profile");
    } catch (error) {
      // If login fails, display error message
      setError("Invalid email or password");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>

      <div className="mt-3">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;

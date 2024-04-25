import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
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
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const token = response.data.token;

      localStorage.setItem("token", token);
      navigate("/");
      toast.success("Login successful!");
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <Card
        className="rounded-4 card border-0 w-50 text-white"
        style={{ background: "#82A0AA" }}
      >
        <Card.Body>
          <Card.Title className="text-center" style={{ fontSize: "2rem" }}>
            Login
          </Card.Title>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label> Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Login
            </Button>
            <hr className="my-4" />
          </Form>
          <Link to="/signup" className="btn btn-info w-100 text-white">
            Register
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;

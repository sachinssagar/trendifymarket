import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          fullName,
          email,
          password,
        }
      );
      if (response.status === 201) {
        toast.success("Account Created successfully!");
        localStorage.removeItem("token");
      }
      navigate("/login");
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error("Signup error:", error);
      toast.error("Registration failed. Please try again.");
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
            Register
          </Card.Title>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="fullName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>

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
              Register
            </Button>
            <hr className="my-4" />
          </Form>
          <Link to="/login" className="btn btn-info w-100 text-white">
            Login
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;

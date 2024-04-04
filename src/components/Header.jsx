import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="TrendifyMarket" className="logo" />
              TrendifyMarket
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="flex-grow-1 d-flex align-items-center justify-content-center">
            <Form className="d-flex" role="search">
              <FormControl
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="me-2"
              />
              <Button variant="outline-light" type="submit">
                Search
              </Button>
            </Form>
          </Nav>
          <Nav>
            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart /> Cart
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>
                <FaUser /> Sign In
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

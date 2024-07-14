import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser, FaUserCircle } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/logo.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const cartItemsCount = useSelector((state) => state.cart.length);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    return () => {};
  }, [token]);

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <header>
      <Navbar variant="dark" expand="md" style={{ background: '#2A272A' }} collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="TrendifyMarket" className="logo" />
              TrendifyMarket
            </Navbar.Brand>
          </LinkContainer>

          <Nav>
            {isLoggedIn ? (
              <>
                <LinkContainer to="/profile">
                  <Nav.Link>
                    <FaUserCircle /> Profile
                  </Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={logOut}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              </>
            )}

            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart /> Cart ({cartItemsCount})
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

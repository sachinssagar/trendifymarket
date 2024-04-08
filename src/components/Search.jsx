import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  Button,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true); // Track initial load

  useEffect(() => {
    if (!initialLoad) {
      // Fetch products only if it's not the initial load
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/products`)
        .then((response) => {
          setProducts(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    } else {
      setInitialLoad(false); // Set initialLoad to false after the first render
    }
  }, [initialLoad]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter products based on input
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(input.toLowerCase())
    );
    if (!input) {
      setFilteredProducts([]);
    } else {
      setFilteredProducts(filtered);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    // Filter products based on input as the user types
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (!e.target.value) {
      setFilteredProducts([]);
    } else {
      setFilteredProducts(filtered);
    }
  };

  const handleItemClick = () => {
    setInput("");
    setFilteredProducts([]);
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Form className="d-flex align-items-center" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={input}
              onChange={handleInputChange}
              className="me-2"
            />
            <Button variant="outline-light" type="submit">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
      <div>
        <ListGroup>
          {filteredProducts.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="list-item-link text-decoration-none"
              onClick={handleItemClick}
            >
              <ListGroup.Item>{product.name}</ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default Search;

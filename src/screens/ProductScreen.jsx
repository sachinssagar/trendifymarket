import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-secondary mb-3">
        Back to Products
      </Link>
      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://via.placeholder.com/400x400?text=${product.name}`}
            className="img-fluid"
            alt={product.name}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p className="lead">{product.description}</p>
          <p className="lead">
            <strong>Price: ${product.price}</strong>
          </p>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <h3>Product Details</h3>
          <ul>
            <li>Feature 1: Description of feature 1</li>
            <li>Feature 2: Description of feature 2</li>
            <li>Feature 3: Description of feature 3</li>
            {/* Add more features as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;

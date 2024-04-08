import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // if (!initialLoad) {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      })
      .finally(() => setIsLoading(false));
    // } else {
    //   setInitialLoad(false);
    // }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Link to="/" className="btn btn-secondary mb-3">
            Back to Products
          </Link>
          <div className="row">
            <div className="col-md-6">
              <img
                src={`https://via.placeholder.com/400x400?text=${product.name}`}
                className="img-fluid rounded"
                alt={product.name}
              />
            </div>
            <div className="col-md-6 rounded product-details">
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
        </>
      )}
    </div>
  );
};

export default ProductScreen;

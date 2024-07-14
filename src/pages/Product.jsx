import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../common/Loader';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const defaultImageUrl = 'https://via.placeholder.com/300x200';

  const handleAddToCart = () => {
    if (product) {
      const carteItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image.url,
      };
      dispatch(addToCart(carteItem));
    }
  };

  return (
    <div className="container mt-4">
      {isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <>
          <Link to="/" className="btn btn-secondary mb-3">
            Back to Products
          </Link>
          <div className="row">
            <div className="col-md-6">
              <img
                src={product.image.url ?? defaultImageUrl}
                className="img-fluid rounded product-image mx-auto d-block"
                alt={product.name || 'Product Image'}
              />
            </div>
            <div className="col-md-6 rounded product-details">
              <h2>{product.name}</h2>
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
              <p>
                <strong>Category:</strong> {product.category.name}
              </p>
              <p className="lead">{product.description}</p>
              <p className="lead">
                <strong>Price: ${product.price}</strong>
              </p>
              <button className="btn btn-primary" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;

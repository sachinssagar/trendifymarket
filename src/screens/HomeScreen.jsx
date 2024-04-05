import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/products?page=${currentPage}&limit=${limit}`
      )
      .then((response) => {
        setProducts(response.data.data);
        setTotalPages(Math.ceil(response.data.total / limit));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4">
      <h2 className="my-4 text-center">Products</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 mb-4">
                <Link
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="card h-100">
                    <img
                      src={`https://via.placeholder.com/300x200?text=${product.name}`}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <p className="card-text">
                        <strong>Price: ${product.price}</strong>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-4">
            {totalPages && (
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i + 1} className="page-item">
                    <button
                      className={`btn btn-outline-primary page-link ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                      onClick={() => goToPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;

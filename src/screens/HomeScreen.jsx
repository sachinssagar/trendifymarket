import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9); // Change this number to adjust the number of products per page

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous page
  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Next page
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Products</h2>
      <div className="row">
        {currentProducts.map((product) => (
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
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={goToPrevPage}>
              Previous
            </button>
          </li>
          {Array.from(
            { length: Math.ceil(products.length / productsPerPage) },
            (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button onClick={() => paginate(i + 1)} className="page-link">
                  {i + 1}
                </button>
              </li>
            )
          )}
          <li
            className={`page-item ${
              currentPage === Math.ceil(products.length / productsPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <button className="page-link" onClick={goToNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;

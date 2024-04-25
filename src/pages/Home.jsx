import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import Search from "../components/Search";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 9;

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/products?page=${currentPage}&limit=${limit}&search=${searchTerm}`
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
  }, [currentPage, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const defaultImageUrl = "https://via.placeholder.com/300x200"; //default image

  return (
    <div className="container mt-4">
      <h2 className="my-4 text-center">Products</h2>
      <div className="align-items-center mb-3">
        <Search onSearch={handleSearch} />
      </div>

      {loading ? (
        <div className="loader-container">
          <SyncLoader color="#36d7b7" margin={10} size={20} />
        </div>
      ) : (
        <>
          <div className="row">
            {products.map((product) => (
              <div
                key={product._id}
                className="col-xl-4 col-lg-6 col-md-6 mb-4"
              >
                <Link
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="card h-100">
                    <img
                      src={product?.image?.url || defaultImageUrl}
                      className="card-img-top product-image mx-auto d-block"
                      alt={product?.name || "Product Image"}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product?.name}</h5>
                      <p className="card-text">{product?.description}</p>
                      <p className="card-text">
                        <strong>Price: ${product?.price}</strong>
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

export default Home;

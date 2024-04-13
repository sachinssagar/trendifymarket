import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const PageNotFound = () => {
  return (
    <main>
      <section className="d-flex flex-column justify-content-center px-2">
        <div className="d-flex flex-column align-items-center my-4">
          <p className="display-1 text-gray-700 font-weight-bold my-10 dark:text-white">
            404, Oops!
          </p>
        </div>
        <div className="d-flex justify-content-center my-4">
          <Link to="/">
            <Button variant="primary">Back To HomePage</Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default PageNotFound;

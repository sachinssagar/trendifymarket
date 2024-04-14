import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Foooter from "./components/Foooter";
import AllRoutes from "./AllRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <AllRoutes />
          <ToastContainer />
        </Container>
      </main>
      <Foooter />
    </>
  );
};

export default App;

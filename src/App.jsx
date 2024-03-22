import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Foooter from "./components/Foooter";
import AllRoutes from "./AllRoutes";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <AllRoutes />
        </Container>
      </main>
      <Foooter />
    </>
  );
};

export default App;

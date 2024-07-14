import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Foooter from './components/Foooter';
import AllRoutes from './AllRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <main className="py-3">
        <Container>
          <AllRoutes />
          <ToastContainer />
        </Container>
      </main>
      <Foooter />
    </Provider>
  );
};

export default App;

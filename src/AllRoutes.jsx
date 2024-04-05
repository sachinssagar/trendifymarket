import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import PageNotFound from "./screens/PageNotFound";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />{" "}
      {/* <Route path="/login" element={<LoginPage />} />
      <Route path="/cart" element={<CartPage />} /> */}{" "}
      <Route path="*" element={<PageNotFound title="Page Not Found" />} />
    </Routes>
  );
};

export default AllRoutes;

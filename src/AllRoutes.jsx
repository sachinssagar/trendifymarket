import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
    </Routes>
  );
};

export default AllRoutes;

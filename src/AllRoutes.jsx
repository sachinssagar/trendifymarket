import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/User/SignIn";
import Signup from "./pages/User/SignUp";
import Profile from "./pages/User/UserProfile";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<PageNotFound title="Page Not Found" />} />
    </Routes>
  );
};

export default AllRoutes;

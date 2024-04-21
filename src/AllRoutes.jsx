import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/SignIn";
import Signup from "./pages/SignUp";
import UserProfile from "./pages/User/UserProfile";
import EditProfile from "./pages/User/EditProfile";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="*" element={<PageNotFound title="Page Not Found" />} />
    </Routes>
  );
};

export default AllRoutes;

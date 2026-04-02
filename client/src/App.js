import React from "react";
import { Routes, Route } from "react-router-dom";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import CartPage from "./pages/CartPage";
import SellerDashboard from "./pages/SellerDashboard";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/search/:keyword" element={<SearchPage />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* COMMON USER */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<CartPage />} />

        {/* PRODUCT */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* SELLER ONLY */}
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />

      </Routes>
    </>
  );
}
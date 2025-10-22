import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import SellerDashboard from './pages/SellerDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import Profile from "./pages/Profile";
import ForgotPassword from './pages/ForgotPassword';
export default function App() {
  return (
    <>
      <Navbar/>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/product/:id" element={<ProductPage/>}/>
          <Route path="/cart" element={<PrivateRoute><CartPage/></PrivateRoute>}/>
          <Route path="/seller" element={<PrivateRoute sellerOnly><SellerDashboard/></PrivateRoute>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
            <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/profile" element={<Profile />} />
<Route path="/forgot-password" element={<ForgotPassword />} />


        </Routes>
      </main>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return navigate("/login"); // Require login
    const checkoutProduct = JSON.parse(localStorage.getItem("checkoutProduct"));
    setProduct(checkoutProduct);
  }, [navigate, user]);

  if (!product) return <p>No product selected.</p>;

  const handlePayment = () => {
    // For now just show a "payment successful" page
    // In real app, integrate Stripe/PayPal
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const newCart = cart.filter((p) => p._id !== product._id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    localStorage.removeItem("checkoutProduct");

    // redirect to home or "Payment Successful" page
    navigate("/payment-success");
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <img src={product.imageUrl} alt={product.name} style={{ width: "250px", height: "250px", objectFit: "contain" }} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

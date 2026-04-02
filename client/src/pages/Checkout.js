import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ✅ SUPPORT BOTH
  const product = state?.product;
  const cart = state?.cart;

  // ✅ ALWAYS ARRAY
  const items = cart ? cart : product ? [product] : [];

  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("COD");

  if (items.length === 0) return <p>No product selected</p>;

  const total = items.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const placeOrder = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return navigate("/login");

    const orderKey = `orders_${user.email}`;
    const orders = JSON.parse(localStorage.getItem(orderKey)) || [];

    // ✅ CREATE SEPARATE ORDER PER ITEM (your existing logic)
    const newOrders = items.map((item) => {
      const p = item.product || item;

      return {
        id: Date.now() + Math.random(),
       product: {
  name: p.name,
  price: p.price,
  image: p.image || p.imageUrl || p.images?.[0] || "",
  _id: p._id,
  id: p.id,
},
        address,
        payment,
        date: new Date().toLocaleString(),
      };
    });

    const updatedOrders = [...orders, ...newOrders];
    localStorage.setItem(orderKey, JSON.stringify(updatedOrders));

    // 🔥 FIX: DO NOT CLEAR FULL CART
    const cartKey = `cart_${user.email}`;
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const updatedCart = existingCart.filter(
      (cartItem) =>
        !items.some(
          (item) =>
            (item._id || item.id) === (cartItem._id || cartItem.id)
        )
    );

    localStorage.setItem(cartKey, JSON.stringify(updatedCart));

    navigate("/order-success");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>

      {items.map((item, index) => {
        const p = item.product || item;

        return (
          <div key={index} style={{ marginBottom: "10px" }}>
            <h3>{p.name}</h3>
            <p>₹{p.price} × {item.qty || 1}</p>
          </div>
        );
      })}

      <h3>Total: ₹{total}</h3>

      <textarea
        placeholder="Enter delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ width: "300px", height: "80px" }}
      />

      <br /><br />

      <select
        value={payment}
        onChange={(e) => setPayment(e.target.value)}
      >
        <option value="COD">Cash on Delivery</option>
        <option value="UPI">UPI</option>
        <option value="Card">Card</option>
      </select>

      <br /><br />

      <button
        onClick={placeOrder}
        disabled={!address}
        style={{
          background: "green",
          color: "white",
          padding: "10px",
        }}
      >
        Place Order
      </button>
    </div>
  );
}
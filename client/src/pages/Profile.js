import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {user?.name}</h2>

      <div style={{ marginTop: "20px" }}>
        <div
          className="profile-card"
          onClick={() => navigate("/cart")}
        >
          🛒 Your Cart
        </div>

        <div
          className="profile-card"
          onClick={() => navigate("/orders")}
        >
          📦 Your Orders
        </div>

        {user?.role === "seller" && (
          <div
            className="profile-card"
            onClick={() => navigate("/seller-dashboard")}
          >
            📊 Seller Dashboard
          </div>
        )}
      </div>
    </div>
  );
}
import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#f3f3f3"
    }}>
      
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        
        <h1 style={{ color: "green" }}>🎉 Order Placed Successfully</h1>
        <p>Your order has been confirmed</p>

        <button
          onClick={() => navigate("/orders")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#ff9900",
            border: "none",
            color: "white",
            cursor: "pointer"
          }}
        >
          View My Orders
        </button>
      </div>

    </div>
  );
}
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!user) {
    return <p>Please login to view your profile.</p>;
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "5rem",
      textAlign: "center"
    }}>
      <h2>Hello, {user.name}!</h2>
      {user.role === "seller" ? (
        <>
          <p>Welcome to your Seller Dashboard.</p>
          <button
            style={{
              marginTop: "1rem",
              padding: "10px 20px",
              backgroundColor: "#ffd814",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            onClick={() => navigate("/seller")}
          >
            Go to Dashboard
          </button>
        </>
      ) : (
        <>
          <p>Welcome to ShopEase.</p>
          <button
            style={{
              marginTop: "1rem",
              padding: "10px 20px",
              backgroundColor: "#ffd814",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            onClick={() => navigate("/")}
          >
            Click here to shop
          </button>
        </>
      )}
    </div>
  );
}

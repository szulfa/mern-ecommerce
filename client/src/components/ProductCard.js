import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate(`/product/${product._id}`)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={product.image}
        alt={product.name}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/150";
        }}
      />

      </div>
  );
}
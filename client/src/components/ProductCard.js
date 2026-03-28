import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
      <img src={product.imageUrl} alt={product.name} />

      <h4>{product.name}</h4>

      <p className="desc">{product.description}</p>

      <h3 className="price">₹{product.price}</h3>

      <button
        className="btn-add"
        onClick={(e) => {
          e.stopPropagation();
          alert("Added to cart");
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
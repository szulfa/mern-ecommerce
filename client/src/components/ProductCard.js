import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!user) return navigate("/login");

    const key = `cart_${user.email}`;
    const cart = JSON.parse(localStorage.getItem(key)) || [];

    if (!cart.find(p => p._id === product._id)) {
      cart.push(product);
      localStorage.setItem(key, JSON.stringify(cart));

      setAdded(true);
      setTimeout(() => setAdded(false), 2000);

      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  const handleBuyNow = () => {
    if (!user) return navigate("/login");

    localStorage.setItem("checkoutProduct", JSON.stringify(product));
    navigate("/checkout");
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <p>Stock: {product.stock}</p>
      <div className="buttons">
        <button className="btn-add" onClick={handleAddToCart}>Add to Cart</button>
        <button className="btn-buy" onClick={handleBuyNow}>Buy Now</button>
      </div>
      {added && <div className="added-text">Added to cart ✔️</div>}
    </div>
  );
}

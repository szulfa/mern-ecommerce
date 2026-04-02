import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return navigate("/login");

    if (product.stock <= 0) return;

    const cartKey = `cart_${user.email}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/cart");
  };

  const buyNow = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return navigate("/login");

    if (product.stock <= 0) return;

    try {
      await fetch(`http://localhost:5000/api/products/buy/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qty: 1 }),
      });

      navigate("/checkout", { state: { product } });
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;

  if (!product) return <p style={{ padding: "20px" }}>Product not found</p>;

  return (
    <div style={{ padding: "20px" }}>

      {product.stock <= 0 && (
        <h2 style={{ color: "red" }}>OUT OF STOCK</h2>
      )}

      <img
        src={product.image}
        alt={product.name}
        width="200"
        style={{ opacity: product.stock <= 0 ? 0.5 : 1 }}
      />

      <h2>{product.name}</h2>
      <h3>₹{product.price}</h3>

      <p style={{ fontWeight: "bold" }}>
        Stock: {product.stock}
      </p>

      <p>{product.description}</p>

      <button
        onClick={addToCart}
        disabled={product.stock <= 0}
        style={{ marginRight: "10px" }}
      >
        Add to Cart
      </button>

      <button
        onClick={buyNow}
        disabled={product.stock <= 0}
        style={{ background: "orange", color: "white" }}
      >
        Buy Now
      </button>
    </div>
  );
}
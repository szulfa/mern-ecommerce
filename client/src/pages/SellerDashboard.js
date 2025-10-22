import React, { useEffect, useState } from "react";
import API from "../services/api";
import ProductForm from "../components/ProductForm";

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/mine");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="seller-dashboard">
      <h2>Seller Dashboard</h2>
      <ProductForm onProductAdded={fetchProducts} />
      <h3>Your Products</h3>
      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          products.map((p) => (
            <div key={p._id} className="product-card">
              <img src={p.imageUrl} alt={p.name} />
              <h4>{p.name}</h4>
              <p>{p.description}</p>
              <p>₹{p.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then(res => {
        console.log("Products:", res.data);
        setProducts(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2 style={{ marginBottom: "1rem" }}>Products</h2>

      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map(p => (
            <ProductCard key={p._id} product={p} />
          ))
        )}
      </div>
    </div>
  );
}
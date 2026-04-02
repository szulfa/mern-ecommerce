import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function SearchPage() {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://mern-ecommerce-1-pgfs.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((p) =>
          p.name.toLowerCase().includes(keyword.toLowerCase())
        );
        setProducts(filtered);
      });
  }, [keyword]);

  return (
    <div className="home">
      <h2 style={{ padding: "20px" }}>Results for "{keyword}"</h2>

      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="card"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img src={product.imageUrl} alt={product.name} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
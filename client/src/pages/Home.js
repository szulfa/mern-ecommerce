import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = (query.get("search") || "").toLowerCase().trim();

  // fetch products
  useEffect(() => {
    fetch("https://mern-ecommerce-1-pgfs.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("Fetch error:", err));
  }, []);

  // reset category on page change
  useEffect(() => {
    setCategory("all");
  }, [location.pathname]);

  const filteredProducts = products.filter((p) => {
    const name = (p?.name || "").toLowerCase();
    const productCategory = (p?.category || "").toLowerCase();

    const matchCategory =
      category === "all" || productCategory === category;

    const matchSearch = name.includes(search);

    return matchCategory && matchSearch;
  });

  return (
    <div className="home">

      {/* CATEGORY BAR */}
      <div className="category-bar">
        <button
          className={category === "all" ? "active" : ""}
          onClick={() => setCategory("all")}
        >
          All
        </button>

        <button
          className={category === "men" ? "active" : ""}
          onClick={() => setCategory("men")}
        >
          Men
        </button>

        <button
          className={category === "women" ? "active" : ""}
          onClick={() => setCategory("women")}
        >
          Women
        </button>

        <button
          className={category === "kids" ? "active" : ""}
          onClick={() => setCategory("kids")}
        >
          Kids
        </button>

        <button
          className={category === "groceries" ? "active" : ""}
          onClick={() => setCategory("groceries")}
        >
          Groceries
        </button>
      </div>

      {/* PRODUCTS */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="no-products">No products found</p>
        )}
      </div>

    </div>
  );
}
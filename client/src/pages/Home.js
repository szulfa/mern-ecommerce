import React, { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const applyFilter = (list) => {
  const query = (localStorage.getItem("searchQuery") || "").toLowerCase();
  if (!query) {
    setFiltered(list);
  } else {
    const filteredList = list.filter((p) => {
      const name = p.name || p.title || ""; 
      return name.toLowerCase().includes(query);
    });
    setFiltered(filteredList);
  }
};


  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
        applyFilter(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const handleSearchUpdate = () => applyFilter(products);
    window.addEventListener("searchUpdated", handleSearchUpdate);
    return () => window.removeEventListener("searchUpdated", handleSearchUpdate);
  }, [products]);

  return (
    <div className="product-grid">
      {filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
        filtered.map((p) => <ProductCard key={p._id} product={p} />)
      )}
    </div>
  );
}

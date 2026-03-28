import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products`)
      .then(res => {
        const found = res.data.find(p => p._id === id);
        setProduct(found);
      })
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <img src={product.imageUrl} alt={product.name} />

      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>₹{product.price}</h3>

        <button className="btn-add">Add to Cart</button>
        <button className="btn-buy">Buy Now</button>
      </div>
    </div>
  );
}
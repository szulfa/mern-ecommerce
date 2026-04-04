import React, { useState } from "react";
import "./ProductForm.css";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("men");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    const productData = {
      name,
      price,
      stock,
      description,
      image,   // ✅ IMPORTANT FIX
      category,
      seller: user?._id || user?.user?._id,
    };

    try {
      const res = await fetch("https://mern-ecommerce-1-pgfs.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        alert("❌ Failed to add product");
        return;
      }

      alert("🎉 Product Added Successfully!");

      // reset form
      setName("");
      setPrice("");
      setStock("");
      setDescription("");
      setImage("");
      setCategory("men");
    } catch (err) {
      console.log(err);
      alert("❌ Server Error");
    }
  };

  return (
    <div className="product-form-page">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Add New Product</h2>

        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <input
          placeholder="Image URL (Cloudinary or direct link)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
          <option value="groceries">Groceries</option>
        </select>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
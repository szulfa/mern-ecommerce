import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // ✅ CHECK USER
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
      return;
    }

    if (storedUser.role !== "seller") {
      navigate("/");
      return;
    }

    setUser(storedUser);
  }, [navigate]);

  // ✅ FETCH PRODUCTS (JWT protected)
  useEffect(() => {
    if (!user) return;

    fetch("http://localhost:5000/api/products", {
      headers: {
        Authorization: `Bearer ${user.token}`, // send JWT
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("SELLER PRODUCTS:", data);
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.log(err);
        setProducts([]);
      });
  }, [user, refresh]);

  // ✅ REFRESH AFTER ADD
  const handleProductAdded = () => {
    setRefresh((prev) => !prev);
  };

  // ✅ DELETE PRODUCT (JWT protected)
  const handleDelete = async (id) => {
    try {
      await fetch(`https://mern-ecommerce-1-pgfs.onrender.com/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`, // send JWT
        },
      });

      setRefresh((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Seller Dashboard 🧑‍💼</h1>

      {user && (
        <div>
          <h3>Welcome, {user.name}</h3>
          <p>Email: {user.email}</p>
        </div>
      )}

      <hr />

      <ProductForm onProductAdded={handleProductAdded} />

      <hr />

      <h2>Your Products</h2>

      {/* ✅ SAFE RENDER */}
      {Array.isArray(products) && products.length === 0 ? (
        <p>No products found</p>
      ) : (
        Array.isArray(products) &&
        products.map((product) => (
          <div
            key={product._id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              background: "#fff",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <img
              src={product.image}
              width="80"
              alt={product.name}
              style={{ objectFit: "cover", borderRadius: "5px" }}
            />

            <div style={{ flex: 1 }}>
              <p><b>{product.name}</b></p>
              <p>₹{product.price}</p>
            </div>

            <button
              onClick={() => {
                const confirmDelete = window.confirm(
                  "Are you sure you want to delete this product?"
                );

                if (confirmDelete) {
                  handleDelete(product._id);
                }
              }}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

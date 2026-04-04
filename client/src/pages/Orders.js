import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const orderKey = `orders_${user.email}`;
    const data = JSON.parse(localStorage.getItem(orderKey)) || [];

    setOrders(data);
  }, []);

  const goToProduct = (product) => {
    if (!product) return;
    navigate(`/product/${product._id || product.id}`, { state: product });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order, index) => {
          const product = order.product;

          if (!product) return null;

          return (
            <div
              key={order.id || index}
              style={{
                display: "flex",
                gap: "20px",
                background: "#fff",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              {/* ✅ FIXED IMAGE FALLBACK */}
              <img
                src={
                  product.image ||
                  product.imageUrl ||
                  product.images?.[0] ||
                  "https://via.placeholder.com/100"
                }
                width="100"
                height="100"
                alt={product.name}
                style={{ cursor: "pointer", objectFit: "contain" }}
                onClick={() => goToProduct(product)}
              />

              <div>
                <h3>{product.name}</h3>
                <p>
  {order.quantity || 1} × ₹{product.price} = ₹
  {(order.quantity || 1) * product.price}
</p>
                <p>Payment: {order.payment}</p>
                <p>Address: {order.address}</p>
                <p>Date: {order.date}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
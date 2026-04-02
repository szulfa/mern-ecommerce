import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const cartKey = user ? `cart_${user.email}` : null;

  useEffect(() => {
    if (!cartKey) {
      setCart([]);
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCart(storedCart);
  }, [cartKey]);

  const updateCart = (newCart) => {
    setCart(newCart);

    if (cartKey) {
      localStorage.setItem(cartKey, JSON.stringify(newCart));
    }

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const increaseQty = (index) => {
    const newCart = [...cart];
    newCart[index].qty += 1;
    updateCart(newCart);
  };

  const decreaseQty = (index) => {
    const newCart = [...cart];

    if (newCart[index].qty > 1) {
      newCart[index].qty -= 1;
    } else {
      newCart.splice(index, 1);
    }

    updateCart(newCart);
  };

  // ✅ FIXED TOTAL (PREVENT NaN)
  const total = cart.reduce((sum, item) => {
    return sum + (Number(item.price) || 0) * (Number(item.qty) || 0);
  }, 0);

  const goToProduct = (item) => {
    navigate(`/product/${item._id || item.id}`, { state: item });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    navigate("/Checkout", {
      state: { cart: cart }
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "20px",
                background: "white",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                alignItems: "center"
              }}
            >
              {/* ✅ FIXED IMAGE (IMPORTANT) */}
              <img
                src={
                  item.image ||
                  item.imageUrl ||
                  (Array.isArray(item.images) ? item.images[0] : null) ||
                  "https://placehold.co/100x100"
                }
                alt={item.name}
                width="80"
                height="80"
                style={{
                  objectFit: "contain",
                  cursor: "pointer",
                  borderRadius: "6px"
                }}
                onError={(e) => {
                  e.target.src = "https://placehold.co/100x100";
                }}
                onClick={() => goToProduct(item)}
              />

              <div style={{ flex: 1 }}>
                <p>{item.name}</p>
                <p>₹{item.price}</p>
              </div>

              <div>
                <button onClick={() => decreaseQty(index)}>-</button>
                <span style={{ margin: "0 10px" }}>{item.qty}</span>
                <button onClick={() => increaseQty(index)}>+</button>
              </div>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>

          <button
            onClick={handleCheckout}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const cartKey = user ? `cart_${user.email}` : null;
  const budgetKey = user ? `budget_${user.email}` : null;

  // ======================
  // LOAD CART + BUDGET
  // ======================
  useEffect(() => {
    if (!cartKey) {
      setCart([]);
      return;
    }

    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCart(storedCart);

    const storedBudget = localStorage.getItem(budgetKey);
    if (storedBudget) setBudget(Number(storedBudget));
  }, [cartKey]);

  // ======================
  // UPDATE CART
  // ======================
  const updateCart = (newCart) => {
    setCart(newCart);

    if (cartKey) {
      localStorage.setItem(cartKey, JSON.stringify(newCart));
    }

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ======================
  // BUDGET HANDLER
  // ======================
  const handleBudgetChange = (e) => {
    const value = Number(e.target.value);
    setBudget(value);

    if (user) {
      localStorage.setItem(budgetKey, value);
    }
  };

  // ======================
  // CART FUNCTIONS
  // ======================
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

  // ======================
  // TOTAL CALCULATION
  // ======================
  const total = cart.reduce((sum, item) => {
    return sum + (Number(item.price) || 0) * (Number(item.qty) || 0);
  }, 0);

  const remaining = budget ? budget - total : null;

  // ======================
  // BEST DEAL (CHEAPEST ITEM)
  // ======================
  const getBestDealIndex = () => {
    if (cart.length === 0) return -1;

    let minIndex = 0;
    let minPrice = Number(cart[0].price);

    cart.forEach((item, index) => {
      if (Number(item.price) < minPrice) {
        minPrice = Number(item.price);
        minIndex = index;
      }
    });

    return minIndex;
  };

  const bestDealIndex = getBestDealIndex();

  // ======================
  // CHECKOUT (BLOCK IF OVER BUDGET)
  // ======================
  const handleCheckout = () => {
    if (cart.length === 0) return;

    if (budget && total > budget) {
      alert("⚠️ Cannot proceed: Budget exceeded!");
      return;
    }

    navigate("/Checkout", { state: { cart } });
  };

  const goToProduct = (item) => {
    navigate(`/product/${item._id || item.id}`, { state: item });
  };

  // ======================
  // UI
  // ======================
  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {/* 📊 CART SUMMARY CARD */}
      <div
        style={{
          background: "#f5f5f5",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "15px",
        }}
      >
        <h3>Cart Summary</h3>

        <p>
          Total Items:{" "}
          {cart.reduce((sum, item) => sum + (item.qty || 1), 0)}
        </p>

        <p>Total Price: ₹{total}</p>

        {budget && (
          <>
            <p>Budget: ₹{budget}</p>
            <p>Remaining: ₹{remaining}</p>
          </>
        )}

        {budget && total > budget && (
          <p style={{ color: "red" }}>⚠️ Over Budget</p>
        )}
      </div>

      {/* 💰 BUDGET INPUT */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="number"
          placeholder="Set your budget (₹)"
          value={budget}
          onChange={handleBudgetChange}
          style={{ padding: "5px", marginRight: "10px" }}
        />
      </div>

      {/* 🛒 CART ITEMS */}
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
                background:
                  index === bestDealIndex ? "#e6ffe6" : "white",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                alignItems: "center",
                border:
                  index === bestDealIndex
                    ? "2px solid green"
                    : "none",
              }}
            >
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
                style={{ objectFit: "contain", cursor: "pointer" }}
                onClick={() => goToProduct(item)}
              />

              <div style={{ flex: 1 }}>
                <p>{item.name}</p>
                <p>₹{item.price}</p>

                {index === bestDealIndex && (
                  <p style={{ color: "green" }}>🏷️ Best Deal</p>
                )}
              </div>

              <div>
                <button onClick={() => decreaseQty(index)}>-</button>
                <span style={{ margin: "0 10px" }}>
                  {item.qty}
                </span>
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
              cursor: "pointer",
            }}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
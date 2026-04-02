import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  // =========================
  // USER SYNC
  // =========================
  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    syncUser();

    window.addEventListener("userUpdated", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("userUpdated", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  // =========================
  // CART SYNC (FIXED)
  // =========================
  useEffect(() => {
    const updateCart = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      // reset if no user
      if (!storedUser) {
        setCartCount(0);
        return;
      }

      const cartKey = `cart_${storedUser.email}`;
      const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

      const totalItems = cart.reduce(
        (sum, item) => sum + (item.qty || 1),
        0
      );

      setCartCount(totalItems);
    };

    updateCart();

    window.addEventListener("cartUpdated", updateCart);
    window.addEventListener("userUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
      window.removeEventListener("userUpdated", updateCart);
    };
  }, []);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);

    window.dispatchEvent(new Event("userUpdated"));
    window.dispatchEvent(new Event("cartUpdated")); // 🔥 important reset

    navigate("/login");
  };

  // =========================
  // SEARCH
  // =========================
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const isSeller = user?.role?.toLowerCase() === "seller";

  // =========================
  // UI
  // =========================
  return (
    <div className="navbar">

      {/* LOGO */}
      <Link to="/" className="logo">
        ShopEase
      </Link>

      {/* SEARCH */}
      <div className="nav-search">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>

      {/* RIGHT SIDE */}
      <div className="nav-right">

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile">👤 {user.name}</Link>
            <Link to="/orders">📦 Orders</Link>

            {/* CART ICON */}
            <Link to="/cart">🛒 ({cartCount})</Link>

            {/* SELLER DASHBOARD */}
            {isSeller && (
              <Link to="/seller-dashboard">📊 Dashboard</Link>
            )}

            {/* LOGOUT */}
            <span onClick={handleLogout} className="logout-btn">
              🚪 Logout
            </span>
          </>
        )}

      </div>
    </div>
  );
}
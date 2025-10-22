import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser, FaSignOutAlt, FaSearch } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [search, setSearch] = useState(localStorage.getItem("searchQuery") || "");
  const [cartCount, setCartCount] = useState(0);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    localStorage.setItem("searchQuery", value);
    window.dispatchEvent(new Event("searchUpdated"));
    navigate("/");
  };

  useEffect(() => {
    const updateCart = () => {
      if (user) {
        const key = `cart_${user.email}`;
        const userCart = JSON.parse(localStorage.getItem(key)) || [];
        setCartCount(userCart.length);
      } else {
        setCartCount(0);
      }
    };

    window.addEventListener("cartUpdated", updateCart);
    updateCart();

    return () => window.removeEventListener("cartUpdated", updateCart);
  }, [user]);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">ShopEase</Link>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
        />
        <FaSearch />
      </div>

      <div className="nav-right">
        <Link to="/" className="nav-btn" title="Home">
          <FaHome size={20} />
        </Link>

        <Link to="/cart" className="cart-icon" title="Cart">
          <FaShoppingCart size={20} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>

        {user ? (
          <>
            <Link to="/profile" className="nav-btn" title="Profile">
              <FaUser size={20} />
            </Link>
            <button onClick={logout} className="logout-btn" title="Logout">
              <FaSignOutAlt size={20} />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

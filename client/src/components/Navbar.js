import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/">ShopEase</Link>
      </div>

      <div className="nav-search">
        <input type="text" placeholder="Search for products..." />
        <button>Search</button>
      </div>

      <div className="nav-links">
        {user ? (
          <span>Hello, {user.name}</span>
        ) : (
          <Link to="/login">Sign In</Link>
        )}

        <Link to="/cart">Cart <FaShoppingCart /></Link>
      </div>
    </div>
  );
}
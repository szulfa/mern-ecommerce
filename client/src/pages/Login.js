import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        "https://mern-ecommerce-1-pgfs.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        }
      );

      const data = await res.json();

      if (res.ok) {
        // ✅ ALWAYS STORE IN LOCALSTORAGE
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        // ✅ UPDATE NAVBAR
        window.dispatchEvent(new Event("userUpdated"));

        // ✅ REDIRECT
        navigate(data.user.role === "seller" ? "/seller-dashboard" : "/");
      } else {
        setError(data.msg || data.message || "Invalid credentials ❌");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="auth">
      <div className="auth-box">
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                cursor: "pointer"
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit">Login</button>
        </form>

        <p style={{ fontSize: "0.9rem" }}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <div className="auth-switch">
          New user? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
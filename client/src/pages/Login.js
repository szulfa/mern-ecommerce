import React, { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(""); // 🔴 red message state
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear old error

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);

      if (remember) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
      }

      if (res.data.user.role === "seller") navigate("/seller");
      else navigate("/");
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        "Account not found. Please check your credentials or register first.";
      setError("❌ " + msg);
    }
  };

  return (
    <div className="form-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="forgot-link">
            Forgot Password?
          </Link>
        </div>

        {/* 🔴 Error message */}
        {error && (
          <p style={{ color: "red", fontSize: "0.9rem", marginTop: "0.5rem" }}>
            {error}
          </p>
        )}

        <button type="submit" className="btn">
          Login
        </button>

        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

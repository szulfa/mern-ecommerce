import React, { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer"); // default role
  const [error, setError] = useState(""); // 🔴 show red message
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // reset error before new submit

    try {
      const res = await api.post("/auth/register", { name, email, password, role });
      login(res.data.user, res.data.token);

      if (role === "seller") navigate("/seller");
      else navigate("/");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "⚠️ User already exists. Please login instead.";

      // ✅ Handle duplicate email gracefully
      if (msg.toLowerCase().includes("exist")) {
        setError("⚠️ User already exists. Please login instead.");
      } else {
        setError("❌ " + msg);
      }
    }
  };

  return (
    <div className="form-card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>

          {error && (
          <p style={{ color: "red", fontSize: "0.9rem", marginTop: "0.5rem" }}>
            {error}
          </p>
        )}

        <button type="submit" className="btn">
          Register
        </button>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

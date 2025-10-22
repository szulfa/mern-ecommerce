import React, { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMessage(res.data.message || "Check your email for reset instructions.");
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Email not found. Please register first."
      );
    }
  };

  return (
    <div className="form-card">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn">
          Reset Password
        </button>
        {message && <p style={{ marginTop: "1rem", color: "green" }}>{message}</p>}
      </form>
      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        Remembered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

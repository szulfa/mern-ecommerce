import React from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="form-card">
      <h2>Forgot Password</h2>

      <p style={{ marginTop: "1rem", color: "gray" }}>
        We are working to make your experience better.<br />
        Thank you ❤️
      </p>

      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        Remembered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
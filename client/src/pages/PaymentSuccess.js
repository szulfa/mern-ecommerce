import React from "react";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="payment-success">
      <h2>Payment Successful! ✅</h2>
      <p>Thank you for your purchase.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
}



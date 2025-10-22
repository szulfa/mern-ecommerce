import React, { useState, useEffect } from "react";

export default function CartPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userKey = user?.email;
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(`cart_${userKey}`)) || [];
    setCart(storedCart);
  }, [userKey]);

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    localStorage.setItem(`cart_${userKey}`, JSON.stringify(newCart));
    setCart(newCart);

    // Notify Navbar to update count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleCheckout = (product) => {
    localStorage.setItem("checkoutProduct", JSON.stringify(product));
    window.location.href = "/checkout";
  };

  if (!user) return <p>Please login to view your cart.</p>;

  return (
    <div className="cart-page">
      <h2>{user.name}'s Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((product, index) => (
            <div key={index} className="cart-item">
              <img src={product.imageUrl} alt={product.name} />
              <div>
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
                <button className="btn-remove" onClick={() => handleRemove(index)}>Remove</button>
                <button className="btn-buy" onClick={() => handleCheckout(product)}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

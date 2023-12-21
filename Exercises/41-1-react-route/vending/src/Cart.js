// Cart.js
import React from "react";
import "./Cart.css"; // Import the CSS file

const Cart = ({ cartItems }) => {
  console.log(cartItems);
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {Object.keys(cartItems).length > 0 ? (
        <ul className="cart-items">
          {Object.keys(cartItems).map((item, index) => (
            <li key={index}>
              {item} - Quantity: {cartItems[item]}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;

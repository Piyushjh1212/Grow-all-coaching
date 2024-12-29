import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header({ cart, handleRemoveFromCart, handleClearCart }) {
  const [showCart, setShowCart] = useState(false); // Toggle cart visibility

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <img src="src/assets/GAC.jpg" alt="logo" width={70} height={70} />
      </div>

      {/* Mobile Menu Toggle */}
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="hamburger" aria-label="Toggle menu">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </label>

      {/* Navigation Links */}
      <nav className="nav-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/service">Service</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Login and Cart Section */}
      <div className="login-cart">
        {/* Login */}
        <div className="Header-login-container">
          <Link to="/login">
            <h1 className="login-btn">Login</h1>
          </Link>
        </div>

        {/* Cart Icon */}
        <div
          className="cart-icon"
          role="button"
          aria-label="Toggle cart"
          onClick={() => setShowCart(!showCart)}
        >
          🛒 {cart.length} {/* Display the cart count */}
        </div>
      </div>

      {/* Cart Dropdown */}
      {showCart && (
        <div className="cart-dropdown">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-items">
                {cart.map((item) => (
                  <li key={item.id} className="cart-item">
                    <span>{item.name}</span>
                    <span>Qty: {item.quantity}</span>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="remove-item-btn"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <button onClick={handleClearCart} className="clear-cart-btn">
                Clear Cart
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

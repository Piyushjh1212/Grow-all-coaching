import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Contact from "./Component/Home/Contact/Contact";
import Header from "./Component/Header/Header";
import Footer from "./Component/Header/Footer/Footer";
import Login from "./Component/Header/Login/Login";
import Signup from "./Component/Header/Login/SignUp/SignUp";
import ProductPage from "./Component/Product/ProductPage";
import ProductDetail from "./Component/Product/IndividualProduct/ProductDetails";

const App = () => {
  // State for the cart
  const [cart, setCart] = useState([]);

  // Add product to the cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove a single item from the cart
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Clear the entire cart
  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      {/* Header with cart functionality */}
      <Header
        cart={cart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleClearCart={handleClearCart}
      />

      {/* Main Content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<ProductPage handleAddToCart={handleAddToCart} />}/>
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;

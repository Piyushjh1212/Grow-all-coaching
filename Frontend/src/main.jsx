import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Import App component

// Define your handleAddToCart function (or import it from elsewhere)
const handleAddToCart = (product) => {
  console.log('Product added:', product);
  // Logic to add product to cart
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App handleAddToCart={handleAddToCart} />
);

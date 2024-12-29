import React from "react";
import { useLocation } from "react-router-dom";


const ProductDetail = () => {
  const { state } = useLocation();
  const product = state?.product;

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <div className="product-detail-image">
        <img src={product.image} alt={product.name} />
      </div>
      <p className="product-detail-price">
        <span className="real-price">{product.realPrice}/-</span> INR{" "}
        {product.price}/-
        <span className="Discounted-Price"> {product.Discounted}</span>
      </p>
      <p>Product Description: Add your course description here.</p>
    </div>
  );
};

export default ProductDetail;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css";

const ProductPage = ({ handleAddToCart }) => {
  const navigate = useNavigate();

  const products = [
  {
    id: 1,
    name: "Html and CSS",
    price: 499,
    realPrice: 1999,
    Discounted: "75% OFF",
    image: "src/assets/html.jpg",
  },
  {
    id: 2,
    name: "Javascript",
    price: 999,
    realPrice: 4999,
    Discounted: "80% OFF",
    image: "src/assets/javascript.webp",
  },
  {
    id: 3,
    name: "Master Frontend Course",
    price: 1399,
    realPrice: 6999,
    Discounted: "75% OFF",
    image: "src/assets/MasterCou.webp",
  },
  {
    id: 4,
    name: "React with Redux Toolkit",
    price: 1499,
    realPrice: 1999,
    Discounted: "75% OFF",
    image: "src/assets/react.webp",
  },
  {
    id: 5,
    name: "Node.js",
    price: 2499,
    realPrice: 1999,
    Discounted: "75% OFF",
    image: "src/assets/node.webp",
  },
  {
    id: 6,
    name: "Full Backend Course",
    price: 9999,
    realPrice: 19999,
    Discounted: "50% OFF",
    image: "src/assets/Backend.webp",
  },
  {
    id: 7,
    name: "Java",
    price: 9999,
    realPrice: 19999,
    Discounted: "50% OFF",
    image: "src/assets/java.webp",
  },
  {
    id: 8,
    name: "Java and springboot",
    price: 9999,
    realPrice: 19999,
    Discounted: "50% OFF",
    image: "src/assets/springboot.webp",
  },
  {
    id: 9,
    name: "Python",
    price: 9999,
    realPrice: 19999,
    Discounted: "50% OFF",
    image: "src/assets/python.webp",
  },
  {
    id: 10,
    name: "C and C++",
    price: 9999,
    realPrice: 19999,
    Discounted: "50% OFF",
    image: "src/assets/ccc.webp",
  },
  ];

  return (
    <section className="product-section">
      <h2 className="product-header">Learning Path...</h2>
      <h2 className="product-second-header">Web Development Courses</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p className="price">
              <span className="real-price">{product.realPrice}/-</span> INR{" "}
              {product.price}/-
              <span className="Discounted-Price"> {product.Discounted}</span>
            </p>
            <div className="product-details">
              <button
                className="add-to-cart-btn-buy-n"
                onClick={() =>
                  navigate(`/product/${product.id}`, { state: { product } })
                }
              >
                Buy Now
              </button>
              <button
                className="add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductPage;

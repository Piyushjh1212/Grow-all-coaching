
import React, { useState } from 'react';
import './Home.css';
import ProductPage from '../Product/ProductPage';
import Contact from './Contact/Contact';

export default function HomePage() {
  const [showText, setShowText] = useState(false);

  const handleButtonClick = () => {
    setShowText(true);
  };

  return (
    <>
    <div className="home-page">
      {/* Background Video */}
      <div className="video-background">
        <video autoPlay loop muted>
          <source src="video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Overlay */}
      <div className="content-overlay">
        <h1 className="main-title">Welcome to GrowAll-Coaching</h1>
        <p className="sub-title">An immersive platform to build you Carrer</p>
      </div>
    </div>
    <ProductPage />
    <Contact />
    </>
    
  );
}

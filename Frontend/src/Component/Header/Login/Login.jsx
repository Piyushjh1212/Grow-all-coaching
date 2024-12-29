import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link to navigate between pages
import './Login.css';  // Importing the login page styles

import { FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill out all fields.');
      return;
    }

    setError('');
    alert(`Logging in with Email: ${email}`);
  };

  const handleQuickLogin = (platform) => {
    alert(`Quick login with ${platform}`);
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="image-section">
        </div>
        <div className="login-container">
          <h2>Login to Your Account</h2>
          {error && <p className="error">{error}</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Login</button>
          </form>

          <div className="social-login">
            <p>Or login with</p>
            <div className="social-buttons">
              <button
                className="google-btn"
                onClick={() => handleQuickLogin('Google')}
              >
                <FaGoogle className="social-icon" /> Google
              </button>
              <button
                className="facebook-btn"
                onClick={() => handleQuickLogin('Facebook')}
              >
                <FaFacebookF className="social-icon" /> Facebook
              </button>
              <button
                className="twitter-btn"
                onClick={() => handleQuickLogin('Twitter')}
              >
                <FaTwitter className="social-icon" /> Twitter
              </button>
            </div>
          </div>

          <div className="signup-option">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

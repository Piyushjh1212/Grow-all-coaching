import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 🔐 Check login using cookie
 useEffect(() => {
  let isMounted = true; // safety flag in case component unmounts

  const checkLogin = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/v1/UserLoginSignup/profile",
        {
          credentials: "include", // cookie send karega
        }
      );

      if (!isMounted) return; // unmounted component pe state update na ho

      setIsLoggedIn(res.ok);
    } catch (error) {
      if (!isMounted) return;
      console.error(error);
      setIsLoggedIn(false);
    }
  };

  checkLogin();

  return () => {
    isMounted = false;
  };
}, []);

  // 🚪 Logout
 const handleLogout = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/v1/UserLoginSignup/logout",
      {
        method: "POST",
        credentials: "include" // cookie send karega
      }
    );

    if (res.ok) {
      setIsLoggedIn(false); // state update
      navigate("/");        // redirect
      // ❌ no need for localStorage.removeItem or window.location.reload
    } else {
      console.error("Logout failed");
    }

  } catch (error) {
    console.error(error);
  }
};

  return (
    <header className="hed-navbar">

      {/* LEFT : Logo */}
      <div className="hed-nav-left">
        <img
          src="https://res.cloudinary.com/dieboinjz/image/upload/v1772387672/GacImages/cjgywtxrv1g6etyve2rl.jpg"
          alt="Nova Logo"
          className="hed-logo"
        />

        <span className="hed-brand">
          Grow All Coaching <br /> & IT solutions
        </span>
      </div>

      {/* CENTER : Navigation */}
      <nav className={isOpen ? "hed-nav-center active" : "hed-nav-center"}>
        <div className="hed-menu-list">
          <a href="#">Company</a>
          <a href="#">Contact</a>
          <a href="#">Support</a>
          <a href="#">Practice</a>
          <a href="#">Investors</a>
        </div>
      </nav>

      {/* RIGHT : Login / Profile */}
      <div className="hed-nav-right">

        {!isLoggedIn ? (

          <div className="hed-cta-user-login-signup-btn">
            <Link to="/UserLogin" className="hed-cta-btn login">Login</Link>
            <Link to="/UserSignUp" className="hed-cta-btn signup">Sign Up</Link>
          </div>

        ) : (

          <div className="hed-cta-user-profile-logout">

            <button
              className="hed-user-icon"
              onClick={() => navigate("/UserProfileDashboard")}
            >
              <FaUser />
            </button>

            <button
              className="hed-cta-btn login"
              onClick={handleLogout}
            >
              Logout
            </button>

            <div
              className="hed-cta-menu-toggle"
              onClick={toggleMenu}
            >
              ☰
            </div>

          </div>

        )}

      </div>

    </header>
  );
}


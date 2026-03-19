import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./HomePage/Home";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import SignupPage from "./Component/Header/LoginSignup/Signup";
import LoginPage from "./Component/Header/LoginSignup/Login";
import { PublicRoute } from "./PrivacyRoute/PublicRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public Home Page */}
        <Route path="/" element={<Home />} />

        {/* Login and Signup  */}
        <Route path="/UserLogin" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/UserSignUp" element={ <PublicRoute><SignupPage /></PublicRoute>} />


      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

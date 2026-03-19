import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicRoute } from "./PrivacyRoute/PublicRoute";
import { PrivateRoute } from "./PrivacyRoute/PrivateRoute";
import Home from "./HomePage/Home";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
import SignupPage from "./Component/Header/LoginSignup/Signup";
import LoginPage from "./Component/Header/LoginSignup/Login";
import UserDashboard from "./Component/UserProfilePage.jsx/ProfileUserPage";
import CourseModule from "./Component/CoursePage/CourseModule";

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

        <Route path="/UserProfileDashboard" element={ <PrivateRoute><UserDashboard /></PrivateRoute>} />

        <Route path="/course/:id" element={<PrivateRoute><CourseModule /></PrivateRoute>} />





      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

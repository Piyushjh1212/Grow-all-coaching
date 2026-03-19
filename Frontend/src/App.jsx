import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./HomePage/Home";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public Home Page */}
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

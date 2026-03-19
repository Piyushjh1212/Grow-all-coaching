import React from "react";
import "./InstructionPage.css";
import { FaLaptopCode, FaBook, FaRocket, FaChalkboardTeacher } from "react-icons/fa";

export default function InstructionPage() {
  return (
    <section className="Ins-instruction-container">

   
      {/* RIGHT CONTENT */}
      <div className="Ins-instruction-right">
        <h1>IT Projects & EdTech Courses</h1>

        <p>
          We build innovative IT solutions for clients while teaching students
          essential skills in computer science and software development.
        </p>

        <ul className="Ins-instruction-list">
          <li><FaLaptopCode className="Ins-icon" /> IT Projects: Web apps, Mobile apps, Enterprise solutions</li>
          <li><FaBook className="Ins-icon" /> EdTech Courses: Programming, DSA, System Design, Full-stack</li>
          <li><FaRocket className="Ins-icon" /> Real-world experience through project-based learning</li>
          <li><FaChalkboardTeacher className="Ins-icon" /> Learn, Build & Deploy with hands-on mentorship</li>
        </ul>

        <button className="Ins-instruction-btn">
          Explore to Know more  →
        </button>
      </div>

         {/* LEFT IMAGE */}
      <div className="Ins-instruction-left">
        <img src="./image333.jpg" alt="Instructor" />
      </div>


    </section>
  );
}
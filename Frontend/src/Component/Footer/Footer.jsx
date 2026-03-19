import React from 'react'
import "./Footer.css"
import { FaInstagram, FaTwitter, FaFacebookF, FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <footer className="ft-creative-footer">

      <div className="ft-footer-content">

        <div className="ft-footer-brand">
          <h2>Growall Coaching</h2>
          <p>Empowering students with practical skills & real-world knowledge.</p>
        </div>

        <div className="ft-footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Courses</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="ft-footer-contact">
          <h3>Contact Us</h3>
          <p>Company Email: <span className='ft-footer-span'>growallcoaching@gmail.com</span></p>
          <p>hr Email: <span className='ft-footer-span'>hr.growallcoaching@gmail.com </span></p>
          <p>Phone: +91 70246 18290</p>
          <div className="ft-social-icons">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="ft-instagram">
              <FaInstagram />
            </a>

            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="ft-twitter">
              <FaTwitter />
            </a>

            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="ft-facebook">
              <FaFacebookF />
            </a>

            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="ft-youtube">
              <FaYoutube />
            </a>
          </div>

        </div>

      </div>

      <div className="ft-footer-bottom">
        © 2026 Growall Coaching. All Rights Reserved. | <Link to="/Terms/Policies" className='ft-terms-Policies'>Terms & Policies</Link>
      </div>

    </footer>

  )
}

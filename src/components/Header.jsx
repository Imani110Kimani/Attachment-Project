import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa6";
import "../App.css";

const Header = () => (
  <header className="main-header">
    <div className="logo">ChapChap Laundry</div>
    <nav className="menu-bar">
      <a href="#about">About Us</a>
      <a href="#services">Services</a>
      <a href="#contact">Contact</a>
    </nav>
    <div className="social-icons">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <FaFacebook />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
        <FaTwitter />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <FaInstagram />
      </a>
    </div>
  </header>
);

export default Header;

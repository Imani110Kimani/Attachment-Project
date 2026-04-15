import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
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
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="facebook">
        <FacebookIcon />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="twitter">
        <XIcon />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="instagram">
        <InstagramIcon />
      </a>
    </div>
  </header>
);

export default Header;

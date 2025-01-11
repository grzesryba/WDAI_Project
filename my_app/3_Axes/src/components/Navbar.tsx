import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (isHome) {
      const handleScroll = () => {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
          navbar.classList.toggle("transparent", window.scrollY <= 100);
        }
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHome]);

  return (
    <nav className={`navbar ${isHome ? "transparent" : ""}`}>
      <svg className="logo" viewBox="0 0 100 100">
        <path fill="#00bcd4" d="M50 5 L95 30 L95 70 L50 95 L5 70 L5 30 Z" />
        <text x="50" y="60" fontSize="30" fill="white" textAnchor="middle">
          ΔΠ
        </text>
      </svg>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;

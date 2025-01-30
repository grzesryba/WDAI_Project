import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';


const Navbar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pl' ? 'en' : 'pl';
    i18n.changeLanguage(newLang);
  };

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
        <img
            src="https://images.ctfassets.net/hvenzvkwiy9m/1vZvtT6aOAd3vCn4yuUgte/98ea601f1aac2d3a633456579d605d5e/Logo_3AXES_g__wne.png"
            alt="Logo"
            className="logo"
        />

        {/* Hamburger menu */}
        <button
            className="hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>

        {/* Nav links */}
        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            About Us
          </Link>
          <Link to="/projects" onClick={() => setIsMenuOpen(false)}>
            Projects
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
          <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
            Admin
          </Link>
          <button onClick={toggleLanguage}>
            {i18n.t('change_language')}
          </button>
        </div>
      </nav>
  );
};

export default Navbar;

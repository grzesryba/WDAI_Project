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
      <img
        src="https://images.ctfassets.net/hvenzvkwiy9m/1vZvtT6aOAd3vCn4yuUgte/98ea601f1aac2d3a633456579d605d5e/Logo_3AXES_g__wne.png"
        alt=""
        className="logo"
      />

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
        {/*Link do admina w navbarze jest do wywalenia potem ale wygodniej sie testuje admin
        page'a bo nie trzeba wpisywac w url'u*/}
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;

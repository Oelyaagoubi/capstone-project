import React, { useState } from "react";
import "../styles/nav.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.searchInput.value;
    console.log("Search term:", searchValue); // Replace with your search logic
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <form className="searchForm" onSubmit={handleSearch}>
        <input
          type="text"
          name="searchInput"
          placeholder="Search..."
          className="searchInput"
        />
        <button type="submit" className="searchButton">
          🔍
        </button>
      </form>

      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <div className={`navLinks ${menuOpen ? "show" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
        <Link to="/Contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;

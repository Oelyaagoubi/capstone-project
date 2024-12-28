import React from "react";
import "../styles/nav.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.searchInput.value;
    console.log("Search term:", searchValue); // Replace with your search logic
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="" />
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

      <div className="navLinks">
        <Link to="/">Home</Link>
        <Link to="About">About</Link>
        <a href="#contact" className="link">
          Contact
        </a>
      </div>
    </nav>
  );
}

export default Navbar;

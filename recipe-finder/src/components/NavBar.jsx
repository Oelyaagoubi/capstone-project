import React from "react";
import "../styles/nav.css";
import logo from "../assets/logo.png";

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
        <a href="#home" className="link">
          Home
        </a>
        <a href="#about" className="link">
          About
        </a>
        <a href="#contact" className="link">
          Contact
        </a>
      </div>
    </nav>
  );
}

export default Navbar;

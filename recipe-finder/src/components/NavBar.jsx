import React, { useEffect, useState } from "react";
import "../styles/nav.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import useStore from "./store";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropDowvOpen, setDropDowvOpen] = useState(false);
  const {
    categories,

    storeSelectedView,

    fetchSelectedCategory,
  } = useStore();

  const Allcategories = categories.map((obj) => obj.strCategory);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.searchInput.value;
    console.log("Search term:", searchValue); // Replace with your search logic
  };

  const scrollToSelectedCategory = () => {
    storeSelectedView("selectedCategory");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <form className="searchForm" onSubmit={handleSearch}>
        <div className="dropDownMenu">
          <div
            className="drop-down-button"
            onClick={() => {
              // console.log(categories.map((obj) => obj.strCategory));
              setDropDowvOpen((prev) => !prev);
            }}
          >
            <p>
              All categories{" "}
              <FontAwesomeIcon
                id="shuffle"
                icon={faChevronDown}
                size="1x"
                color="black"
              />
            </p>
          </div>
          <div
            className={dropDowvOpen ? "dropDownMenu-ulopen" : "dropDownMenu-ul"}
          >
            <ul>
              {Allcategories.map((category, index) => (
                <li
                  onClick={() => {
                    fetchSelectedCategory(category);
                    setDropDowvOpen((prev) => !prev);
                    storeSelectedView("selectedCategory");
                  }}
                  key={index}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
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

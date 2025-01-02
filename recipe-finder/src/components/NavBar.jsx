import React, { useEffect, useState } from "react";
import "../styles/nav.css";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import useStore from "./store";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropDowvOpen, setDropDowvOpen] = useState(false);
  const [hasTypedFirstLetter, setHasTypedFirstLetter] = useState(false);
  const {
    categories,
    storeSelectedView,
    setmealsSearchNames,
    mealsSearchNames,
    fetchSelectedCategory,
    fetchMealDetailsByID,
    setsearchValue,
    searchValue,
    setSelctedMealNameFromSearch,
  } = useStore();
  const location = useLocation();

  const Allcategories = categories.map((obj) => obj.strCategory);

  useEffect(() => {
    if (searchValue.length > 0) {
      fetchMealbyfirstLetter(searchValue[0]);
    }
  }, [searchValue]);

  const fetchMealbyfirstLetter = async (props) => {
    const lettersOnly = /^[A-Za-z]+$/;
    if (lettersOnly.test(props)) {
      const letter = props;

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        if (data.meals !== null) {
          collectMealsNames(data.meals);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handelClickFromSearch = (val) => {
    fetchMealDetailsByID(val);
    setSelctedMealNameFromSearch(val);
    storeSelectedView("mealFromSearch");
  };

  function FilterBasedOnSearchValue(array) {
    const arrayofnames = array.map((obj) => obj.name);
    console.log(searchValue);
    const filtered = array.filter((word) =>
      word.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setmealsSearchNames(filtered);
    console.log(filtered);
  }

  const dispalyMealsNames = (array) => {
    return array.map((obj, index) => (
      <li
        key={obj.Id}
        id={obj.Id}
        onClick={() => handelClickFromSearch(obj.Id)}
      >
        {obj.name}
      </li>
    ));
  };

  const collectMealsNames = (data) => {
    const mealsName = data.map((obj) => ({
      name: obj.strMeal,
      Id: obj.idMeal,
    }));

    FilterBasedOnSearchValue(mealsName);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const lettersOnly = /^[A-Za-z]+( [A-Za-z]+)*$/;
    const Value = e.target.value.trimStart();
    if (lettersOnly.test(Value)) {
      setsearchValue(Value);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <form className="searchForm" onChange={handleSearch}>
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
              {dropDowvOpen ? (
                <FontAwesomeIcon
                  id="Arrow"
                  icon={faChevronUp}
                  size="1x"
                  color="black"
                />
              ) : (
                <FontAwesomeIcon
                  id="Arrow"
                  icon={faChevronDown}
                  size="1x"
                  color="black"
                />
              )}
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
        <div className="meal-names-serach">
          <ul>{mealsSearchNames && dispalyMealsNames(mealsSearchNames)} </ul>
        </div>
        <input
          type="text"
          name="searchInput"
          placeholder="Search..."
          className="searchInput"
        />
        <button type="submit" className="searchButton">
          <FontAwesomeIcon icon={faSearch} />
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
        <Link
          to={"/"}
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link
          className={`nav-link ${
            location.pathname === "/about" ? "active" : ""
          }`}
          to="/about"
        >
          About
        </Link>
        <Link
          className={`nav-link ${
            location.pathname === "/contact" ? "active" : ""
          }`}
          to="/contact"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

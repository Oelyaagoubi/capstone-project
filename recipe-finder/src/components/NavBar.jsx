import React, { useEffect, useRef, useState } from "react";
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

function Navbar(props) {
  const dropdownRef = useRef(null);
  const dropdownSearchRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [invalidSearchMessage, setInvalidSearchMessage] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(true);
  const [hidebutton, setHidebutton] = useState(false);

  const [selectedMealNameFromSearch, setSelectedMealNameFromSearch] =
    useState("");

  const {
    categories,
    searchValue,
    setsearchValue,
    storeSelectedView,
    setmealsSearchNames,
    mealsSearchNames,
    fetchSelectedCategory,
    fetchMealDetailsByID,
    fetchMealDetailsByName,
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

  const handelClickFromSearch = (id, name) => {
    fetchMealDetailsByID(id);
    setSelectedMealNameFromSearch(name); // Display clicked name in input
    setsearchValue(""); // Clear search filtering
    storeSelectedView("mealFromSearch");
    setmealsSearchNames([]);
  };

  function FilterBasedOnSearchValue(array) {
    const filtered = array.filter((word) =>
      word.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setmealsSearchNames(filtered);
  }

  const dispalyMealsNames = (array) => {
    return array.map((obj, index) => (
      <li
        key={obj.Id}
        id={obj.Id}
        onClick={() => handelClickFromSearch(obj.Id, obj.name)}
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

    const lettersOnly = /^[A-Za-z\s]*$/;
    const Value = e.target.value.trimStart();
    if (selectedMealNameFromSearch) {
      setSelectedMealNameFromSearch(null);
    }

    if (lettersOnly.test(Value)) {
      setsearchValue(Value);
    } else if (Value === "") {
      setsearchValue("");
    }
  };

  useEffect(() => {
    handelInvalidSearch();
  }, [mealsSearchNames, searchValue]);

  const handelInvalidSearch = () => {
    if (mealsSearchNames.length === 0) {
      setInvalidSearchMessage(`"Click Enter to search"`);
    } else if (mealsSearchNames.length !== 0) {
      setInvalidSearchMessage(`"${"please choose a meal from bellow"}"`);
    } else if (searchValue === "") {
      setInvalidSearchMessage("");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMealDetailsByName(searchValue);
    storeSelectedView("mealFromSearch");
  };

  // handel Click outside the search form

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropDownOpen(false);
    }
    if (
      dropdownSearchRef.current &&
      !dropdownSearchRef.current.contains(event.target)
    ) {
      setsearchValue("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  // toggle between search input and the dropdown menu on smal screens

  useEffect(() => {
    toggleOnScreenWidth();
    window.addEventListener("resize", toggleOnScreenWidth);
    return () => window.removeEventListener("resize", toggleOnScreenWidth);
  }, []);

  const toggleOnScreenWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 550) {
      setShowSearchInput(false);
      setHidebutton(true);
    } else if (screenWidth > 550) {
      setShowSearchInput(true);
      setHidebutton(true);
    }
  };

  const toggleOnClick = () => {
    if (!showSearchInput && window.innerWidth < 550) {
      setShowSearchInput((prev) => !prev);
      setHidebutton((prev) => !prev);
    } else if (showSearchInput && window.innerWidth < 550) {
      setShowSearchInput((prev) => !prev);
      setHidebutton((prev) => !prev);
    }
  };

  return (
    <nav className="navbar">
      <div>
        <Link to={"/"}>
          {" "}
          <img className="logo" src={logo} alt="Logo" />
        </Link>
      </div>

      <form
        ref={dropdownSearchRef}
        className="searchForm"
        onSubmit={handleSearchSubmit}
        style={props.pageOnDisplay === "hide" ? { display: "none" } : undefined}
      >
        {hidebutton && (
          <div ref={dropdownRef} className="dropDownMenu">
            <div
              className="drop-down-button"
              onClick={() => {
                setDropDownOpen((prev) => !prev);
              }}
            >
              <p>
                All categories{" "}
                {dropDownOpen ? (
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
                {"  "}|
              </p>
            </div>
            <div
              className={
                dropDownOpen ? "dropDownMenu-ulopen" : "dropDownMenu-ul"
              }
            >
              <ul>
                {Allcategories.map((category, index) => (
                  <li
                    onClick={() => {
                      fetchSelectedCategory(category);
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
        )}

        {showSearchInput && (
          <div className="searchInput">
            <input
              type="text"
              name="searchInput"
              placeholder="Search meals by name..."
              className="searchInput-input"
              onChange={handleSearch}
              value={
                selectedMealNameFromSearch
                  ? selectedMealNameFromSearch
                  : searchValue
              }
            />
            {searchValue !== "" && (
              <div className="meal-names-serach">
                <p>{invalidSearchMessage}</p>
                <ul>{dispalyMealsNames(mealsSearchNames)} </ul>
              </div>
            )}
          </div>
        )}
        <button
          onClick={() => {
            toggleOnClick();
          }}
          type="submit"
          className="searchButton"
        >
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

import chef from "../assets/chef.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react"; // Import useState and useEffect

const Header = () => {
  const [meal, setMeal] = useState(null); // State to store the current meal
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to fetch the random meal
  const fetchRandomMeal = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();
      setMeal(data.meals[0]);
    } catch (err) {
      setError("Error fetching meal");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the initial random meal on component mount
  useEffect(() => {
    fetchRandomMeal();
  }, []);

  // Function to shuffle and fetch a new random meal
  const NewRandomMeal = () => {
    fetchRandomMeal();
  };

  // Handle loading, error, and rendering of meal data
  if (loading)
    return (
      <header className="loading-placeholder">
        <div className="banner loading-banner">
          {/* Placeholder for header content */}
          <div className="banner-screen loading-banner-screen"></div>
          <div className="loading-spinner">Loading...</div>
        </div>
      </header>
    );
  if (error) return <p>{error}</p>;

  if (meal) {
    return (
      <header>
        <div className="banner">
          <div className="banner-screen"></div>
          <div onClick={() => NewRandomMeal()} className="arrow-buttons">
            <FontAwesomeIcon
              id="shuffle-button"
              icon={faShuffle}
              size="2x"
              color="white"
            />
          </div>

          <div className="bannerText">
            <p>Trending now</p>
            <h1>{meal.strMeal}</h1>
            <div className="meal-location">
              <FontAwesomeIcon icon={faLocationDot} size="2x" color="#509E2F" />
              <p>{meal.strArea}</p>
            </div>
          </div>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
        </div>
      </header>
    );
  }

  return null;
};

export default Header;

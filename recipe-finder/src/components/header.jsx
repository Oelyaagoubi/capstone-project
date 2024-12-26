import chef from "../assets/chef.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react"; // Import useState and useEffect

const Header = () => {
  const [meal, setMeal] = useState(null); // State to store the current meal
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

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

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  const NewRandomMeal = () => {
    fetchRandomMeal();
  };

  if (loading)
    return (
      <div className="loading-placeholder">
        <div className="avatar-placeholder"></div>
        <div className="text-placeholder">
          <div className="line-placeholder"></div>
          <div className="line-placeholder short"></div>
          <div className="line-placeholder"></div>
        </div>
      </div>
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

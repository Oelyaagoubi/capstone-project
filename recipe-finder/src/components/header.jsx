import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import useStore from "./store";

const Header = (props) => {
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);
  const { storeSelectedView, mealBanner, setMealBanner, RundermealByID } =
    useStore();

  const fetchRandomMeal = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();
      setMealBanner(data.meals[0]);
    } catch (err) {
      setError("Error fetching meal");
    } finally {
      setLoading(false);
    }
  };
  const displayBannerMeal = () => {
    storeSelectedView("mealFromBarren");
    RundermealByID(mealBanner);
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

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

  if (mealBanner) {
    return (
      <header>
        <div className="banner">
          <div className="banner-screen"></div>
          <div onClick={() => fetchRandomMeal()} className="arrow-buttons">
            <FontAwesomeIcon
              id="shuffle-button"
              icon={faShuffle}
              size="2x"
              color="white"
            />
          </div>

          <div onClick={displayBannerMeal} className="bannerText">
            <p>Trending now</p>
            <h1>{mealBanner[0].strMeal}</h1>
            <div className="meal-location">
              <FontAwesomeIcon icon={faLocationDot} size="2x" color="#509E2F" />
              <p>{mealBanner[0].strArea}</p>
            </div>
          </div>
          <img src={mealBanner[0].strMealThumb} alt={mealBanner[0].strMeal} />
        </div>
      </header>
    );
  }

  return null;
};

export default Header;

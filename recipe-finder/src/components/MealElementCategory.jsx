import meal from "../assets/meal.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const MealElementCategory = (props) => {
  return (
    <div className="mealGrid">
      <div className="mealGridComponent">
        <div className="mealThumb">
          <img src={props.meal.strMealThumb} alt="" />
        </div>
        <div className="mealinfo">
          <div>
            <h2>{props.meal.strMeal}</h2>
          </div>
          <div className="location">
            <FontAwesomeIcon icon={faLocationDot} size="2x" color="#509E2F" />
            <p>place</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MealElementCategory;

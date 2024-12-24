import meal from "../assets/meal.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const MealsGrid = (props) => {
  return (
    <div className="mealGrid">
      <div
        onClick={() => props.displayClickedCategory(props.category.strCategory)}
        className="mealGridComponent"
      >
        <div className="mealThumb">
          <img src={props.category.strCategoryThumb} alt="" />
        </div>
        <div className="mealinfo">
          <div>
            <h2>Russian salad</h2>
            <h3>{props.category.strCategory}</h3>
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
export default MealsGrid;

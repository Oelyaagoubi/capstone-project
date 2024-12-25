import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const MealsGrid = (props) => {
  return (
    <div className="mealGrid">
      <div
        onClick={() => props.displayClickedCategory(props.category.strCategory)}
        className="meal-card-component"
      >
        <div className="meal-card-img">
          <img src={props.category.strCategoryThumb} alt="" />
        </div>
        <div onWheel={(e) => e.stopPropagation()} className="meal-card-info">
          <h1>{props.category.strCategory}</h1>
          <p>{props.category.strCategoryDescription}sdsd</p>
        </div>
      </div>
    </div>
  );
};
export default MealsGrid;

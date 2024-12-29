import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import useStore from "./store";

const MealElementCategory = (props) => {
  const { mealByID, fetchMealDetailsByID } = useStore();
  const { storeSelectedView } = useStore();

  const fetchByID = (id) => {
    fetchMealDetailsByID(id);
  };

  return (
    <div
      onClick={() => {
        fetchByID(props.meal.idMeal);
      }}
      className="mealGrid"
    >
      <div className="mealGridComponent">
        <div className="mealThumb">
          <img src={props.meal.strMealThumb} alt={props.meal.strMeal} />
        </div>
        <div className="mealinfo">
          <div className="meal-info-h2">
            <h2>{props.meal.strMeal}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealElementCategory;

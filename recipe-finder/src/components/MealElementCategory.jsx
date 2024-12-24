import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useStore } from "../components/store";

const MealElementCategory = (props) => {
  const { mealByID, fetchMealDetailsByID } = useStore();

  const fetchByID = (id) => {
    fetchMealDetailsByID(id);
    console.log(id);
  };

  return (
    <div onClick={() => fetchByID(props.meal.idMeal)} className="mealGrid">
      <div className="mealGridComponent">
        <div className="mealThumb">
          <img src={props.meal.strMealThumb} alt={props.meal.strMeal} />
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

import meal from "../assets/meal.jpg";

const MealDetails = (props) => {
  console.log(props.meal);
  const mealprop = props.meal[0];
  return (
    <div className="mealDetails">
      <img src={mealprop.strMealThumb} alt="" />
      <h1>{mealprop.strMeal}</h1>
      <p>{mealprop.strInstructions}</p> {/* Meal instructions */}
      <h3>Ingredients:</h3>
      <ul>
        <ul>
          {Object.keys(meal)
            .filter((key) => key.includes("strIngredient") && meal[key])
            .map((ingredientKey, index) => (
              <li key={index}>
                {meal[ingredientKey]}{" "}
                {
                  meal[
                    `strMeasure${ingredientKey.replace("strIngredient", "")}`
                  ]
                }
              </li>
            ))}
        </ul>
      </ul>
    </div>
  );
};
export default MealDetails;

const MealDetails = (props) => {
  console.log(props.meal);
  const mealprop = props.meal[0];
  return (
    <div className="mealDetails">
      <h1>{mealprop.strMeal}</h1>

      <div className="Instructions">
        <h2>Instructions</h2>
        <p>{mealprop.strInstructions}</p>
      </div>

      <div className="ingredients">
        <div>
          <h3>Ingredients:</h3>
          <ul>
            {Object.keys(mealprop)
              .filter((key) => key.includes("strIngredient") && mealprop[key])
              .map((ingredientKey, index) => (
                <li key={index}>
                  {mealprop[ingredientKey]}
                  {" : "}
                  {
                    mealprop[
                      `strMeasure${ingredientKey.replace("strIngredient", "")}`
                    ]
                  }
                </li>
              ))}
          </ul>
        </div>
        <img src={mealprop.strMealThumb} alt="" />
      </div>
    </div>
  );
};
export default MealDetails;

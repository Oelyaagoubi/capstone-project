const MealDetails = (props) => {
  console.log(props.meal);
  const mealprop = props.meal[0];
  return (
    <div className="mealDetails">
      <div className="meal-detail-thumbnail">
        <h1>{mealprop.strMeal}</h1>
        <img src={mealprop.strMealThumb} alt="" />
      </div>
      <p>{mealprop.strInstructions}</p>

      <h3>Ingredients:</h3>
      <ul>
        <ul>
          {Object.keys(mealprop)
            .filter((key) => key.includes("strIngredient") && mealprop[key])
            .map((ingredientKey, index) => (
              <p key={index}>
                {mealprop[ingredientKey]}
                {" : "}
                {
                  mealprop[
                    `strMeasure${ingredientKey.replace("strIngredient", "")}`
                  ]
                }
              </p>
            ))}
        </ul>
      </ul>
    </div>
  );
};
export default MealDetails;

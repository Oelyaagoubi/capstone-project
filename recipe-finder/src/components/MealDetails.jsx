const MealDetails = (props) => {
  const obj = props.meal[0];
  const url = obj.strYoutube;
  const videoID = url.slice(32);
  const youtubeEmbedLink = `https://www.youtube.com/embed/${videoID}?si=KrJnTeg7a2NQXXMz`;
  console.log(videoID);

  return (
    <div className="mealDetails">
      <h1>{obj.strMeal}</h1>
      <div className="ingredients">
        <div>
          <h3>Ingredients:</h3>
          <ul>
            {Object.keys(obj)
              .filter((key) => key.includes("strIngredient") && obj[key])
              .map((ingredientKey, index) => (
                <li key={index}>
                  {obj[ingredientKey]}
                  {" : "}
                  {
                    obj[
                      `strMeasure${ingredientKey.replace("strIngredient", "")}`
                    ]
                  }
                </li>
              ))}
          </ul>
        </div>
        <img src={obj.strMealThumb} alt={`an image of ${obj.strMeal}`} />
      </div>

      <div className="Instructions">
        <h2>Instructions</h2>
        <p>{obj.strInstructions}</p>
      </div>
      <div className="ifram-section">
        <h2>For Step By Step Checkout The Video</h2>
        <div className="youtube-video-container">
          <iframe
            width="70%"
            height="90%"
            src={youtubeEmbedLink}
            title="YouTube video player"
            frameBorder="none" // Correct casing
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};
export default MealDetails;

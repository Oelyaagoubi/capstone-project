import React, { useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";
import useStore from "./store";
import getRecipeFromMistral from "./ai";

const RecipeGenerator = (props) => {
  const {
    ingredients,
    storeRecipeFromAI,
    setLoadingFromAI,
    recipeFromAI,
    loadingFromAI,
  } = useStore();

  const [RecipeShown, setRecipeShown] = useState(false);

  async function getRecipe() {
    setLoadingFromAI(true);
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    storeRecipeFromAI(recipeMarkdown);
    setLoadingFromAI(false);
  }

  useEffect(() => {
    storeRecipeFromAI("");
    setRecipeShown((prev) => !prev);
  }, [ingredients]);

  const handleGenerateClick = () => {
    if (ingredients.length < 4) {
      alert(`Please enter at least 4 ingredients.`);
      return;
    }

    if (!RecipeShown) {
      getRecipe();
    }

    setRecipeShown((prev) => !prev);
  };

  return (
    <div ref={props.refs} className="recipe-generator">
      <div className="get-recipe-container">
        <div>
          <h3>Ready for a recipe?</h3>
          <p>Generate a recipe from your list of ingredients.</p>
        </div>
        <button
          onClick={handleGenerateClick}
          className="generate-button"
          disabled={loadingFromAI}
        >
          {loadingFromAI
            ? "Generating..."
            : RecipeShown && recipeFromAI
            ? "Hide Recipe"
            : "Generate Recipe"}
        </button>
      </div>
      {recipeFromAI && RecipeShown && (
        <div className="suggested-recipe-container">
          <ReactMarkdown>{recipeFromAI}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;

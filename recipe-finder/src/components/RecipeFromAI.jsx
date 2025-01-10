import React, { useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";
import useStore from "./store";
import getRecipeFromMistral from "./ai";

const RecipeGenerator = (props) => {
  const {
    ingredients,
    storeRecipeFromAI,
    setLoadingFromAI,
    setUserIngredients,
    recipeFromAI,
    loadingFromAI,
  } = useStore();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("RecipeFromAI"));
    const storedIngredient = JSON.parse(
      localStorage.getItem("storedIngredient")
    );
    {
      storedIngredient && setUserIngredients(storedIngredient);
    }

    {
      data && storeRecipeFromAI(data);
    }
  }, []);

  async function getRecipe() {
    setLoadingFromAI(true);
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    storeRecipeFromAI(recipeMarkdown);
    localStorage.setItem("RecipeFromAI", JSON.stringify(recipeMarkdown));
    localStorage.setItem("storedIngredient", JSON.stringify(ingredients));
    console.log("run");

    setLoadingFromAI(false);
  }

  const handleGenerateClick = () => {
    if (ingredients.length < 4) {
      alert(`Please enter at least 4 ingredients.`);
      return;
    }

    if (!recipeFromAI) {
      getRecipe();
    } else if (recipeFromAI) {
      storeRecipeFromAI(null);
      localStorage.removeItem("RecipeFromAI");
      localStorage.removeItem("storedIngredient");
    }
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
            : recipeFromAI
            ? "Hide Recipe"
            : "Generate Recipe"}
        </button>
      </div>
      {recipeFromAI && (
        <div className="suggested-recipe-container">
          <ReactMarkdown>{recipeFromAI}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;

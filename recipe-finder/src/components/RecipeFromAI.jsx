import React from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import useStore from "./store";
// Import CSS file for styles

const RecipeGenerator = (props) => {
  const {
    ingredients,
    storeRecipeFromAI,
    setLoadingFromAI,
    recipeFromAI,
    loadingFromAI,
    RecipeSown,
    setRecipeSown,
  } = useStore();

  const stringWithCommas = ingredients.join(", ");

  const generateRecipe = async () => {
    setLoadingFromAI(true);
    console.log(RecipeSown);
    try {
      const prompt = `
        
        You are an assistant that receives a list of ingredients provided by a 
        user and suggests a recipe they could make with some or all of those 
        ingredients. You don't need to use every ingredient they mention in your recipe. 
        The recipe can include additional ingredients they didn't mention, but try not to include 
        too many extra ingredients. Format your response in markdown to make it easier 
        to render to a web page. Here are the user's ingredients : ${stringWithCommas}.
      `;

      const response = await axios.post(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407",
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: 600,
            temperature: 0.5,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.REACT_APP_API_KEY}`,
          },
        }
      );

      const recipe =
        response.data?.[0]?.generated_text || "No recipe generated.";

      // Clean the recipe by removing the exact prompt text

      const cleanedRecipe = recipe
        .replace(prompt.trim(), "") // Remove the prompt
        .trim();
      storeRecipeFromAI(cleanedRecipe);
    } catch (error) {
      console.error("Error generating recipe:", error);
      storeRecipeFromAI("Unable to generate a recipe. Please try again later.");
    } finally {
      setLoadingFromAI(false);
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
          onClick={() => {
            ingredients.length > 3
              ? generateRecipe()
              : alert("please enter at least 4 ingredients");
            setRecipeSown();
            storeRecipeFromAI("");
          }}
          className="generate-button"
          disabled={loadingFromAI}
        >
          {loadingFromAI
            ? "Generating..."
            : RecipeSown
            ? "Hide Recipe"
            : "Generate Recipe"}
        </button>
      </div>
      {recipeFromAI && RecipeSown && (
        <div className="suggested-recipe-container">
          <div className="ReactMarkdown">{recipeFromAI}</div>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;

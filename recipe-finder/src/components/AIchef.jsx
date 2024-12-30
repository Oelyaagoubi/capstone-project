import useStore from "./store";
import chef from "../assets/chef.png";
import { useState, useRef, useEffect } from "react";
import RecipeGenerator from "./RecipeFromAI";

import IngrediantsList from "./IngredientsList";

export default function Action(props) {
  const addIngredient = useStore((state) => state.addIngredient);

  const [isContentVisible, setIsContentVisible] = useState(false); // State to toggle visibility

  function handleAddIngredient(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const newIngredientVal = formData.get("ingredient");
    const newIngredient = {
      id: Date.now() + Math.random(),
      name: newIngredientVal,
    };

    if (newIngredient.name) {
      addIngredient(newIngredient);
    }
    form.reset();
  }

  // Function to toggle the display of the content
  const toggleContentVisibility = () => {
    setIsContentVisible((prev) => !prev);
  };

  return (
    <div className="ActionContainer">
      <div className="AIchef" onClick={toggleContentVisibility}>
        <img src={chef} alt="AI-Chef" />
        <h1>Chef AI</h1>
      </div>
      <div
        className={`AIchef-container ${
          isContentVisible ? "visible" : "hidden"
        }`}
      >
        <main>
          <form
            onSubmit={handleAddIngredient}
            method="POST"
            className="Actionsection"
          >
            <input
              className="inputfield"
              type="text"
              name="ingredient"
              placeholder="e.g. tomato"
            />
            <button type="submit" className="addButton">
              + Add Ingredient
            </button>
          </form>
          <IngrediantsList />
        </main>
        <div>
          <RecipeGenerator refs={props.refs} />
        </div>
      </div>
    </div>
  );
}

import { useStore } from "./store";
import chef from "../assets/chef.png";
import { useState } from "react";

export default function Action() {
  const addIngredient = useStore((state) => state.addIngredient);
  const [showAIchef, setShowAIchef] = useState(false); // State to toggle visibility

  // Handle form submission to add an ingredient
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

  // Function to toggle the display of AIchef
  const toggleAIchef = () => {
    setShowAIchef((prev) => !prev);
  };

  return (
    <div className="AIchef" onClick={toggleAIchef}>
      <img src={chef} alt="AI-Chef" />
      <h1>Chef AI</h1>

      {/* Conditional rendering for AIchef form */}
      {showAIchef && (
        <main>
          <nav className="navBar">
            <img className="chefImg" src={chef} alt="Chef Claude" />
            <h1 className="title">Chef Claude</h1>
          </nav>
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
        </main>
      )}
    </div>
  );
}

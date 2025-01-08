import useStore from "./store";
import chef from "../assets/chef.png";
import { useState } from "react";
import RecipeGenerator from "./RecipeFromAI";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import IngrediantsList from "./IngredientsListAI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ChefAI(props) {
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
        <div className="AIchef-logo">
          <img src={chef} alt="AI-Chef" />
          <h1>Chef AI</h1>
        </div>

        <div className="AI-chef-text">
          <p>
            create amazing meals <br />
            <span style={{ color: "#fe8259", fontWeight: "bold" }}>
              {" "}
              using{" "}
            </span>
            ingredients you already have{" "}
          </p>
          {isContentVisible ? (
            <FontAwesomeIcon
              id="Arrow"
              icon={faChevronUp}
              size="2x"
              color="black"
            />
          ) : (
            <FontAwesomeIcon
              id="Arrow"
              icon={faChevronDown}
              size="2x"
              color="black"
            />
          )}
        </div>
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
              maxLength={25}
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

import useStore from "./store";
import { useState, useRef } from "react";

export default function List() {
  const ingredients = useStore((state) => state.ingredients);

  const removeIngredient = useStore((state) => state.removeIngredient);
  const editIngredient = useStore((state) => state.editIngredient);

  const [editingId, setEditingId] = useState(null);
  const editInputRef = useRef(null);

  const handleRemovIngredient = (index) => {
    removeIngredient(index);
  };

  const handleEditClick = (id) => {
    setEditingId(id);
  };

  const handleSaveEdit = () => {
    if (editingId !== null && editInputRef.current) {
      const newValue = editInputRef.current.value.trim();
      if (newValue) {
        editIngredient(editingId, newValue);
        setEditingId(null);
      }
    }
  };

  const IngredientsList = ingredients.map((Ingredient, index) => (
    <li key={Ingredient.id}>
      {editingId === Ingredient.id ? (
        <>
          <input
            id={`edit-${Ingredient.id}`}
            type="text"
            defaultValue={Ingredient.name}
            ref={editInputRef}
            maxLength={16}
          />
          <div className="LI-buttons">
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={() => setEditingId(null)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p>{Ingredient.name}</p>
          <div className="LI-buttons">
            <button onClick={() => handleEditClick(Ingredient.id)}>Edit</button>
            <button onClick={() => handleRemovIngredient(index)}>Remove</button>
          </div>
        </>
      )}
    </li>
  ));

  return (
    <div className="thelist">
      <h1>Ingredients on hand:</h1>
      <ul>{IngredientsList}</ul>
    </div>
  );
}

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

  const handleEditClick = (id, currentValue) => {
    setEditingId(id);
  };
  const handleSaveEdit = () => {
    if (editingId !== null && editInputRef.current) {
      const newValue = editInputRef.current.value;
      newValue && editIngredient(editingId, newValue.trim());
      setEditingId(null);
    }
  };

  const IngrediantsList = ingredients.map((Ingrediant, index) => (
    <li key={Date.now() + Math.random()}>
      {editingId === Ingrediant.id ? (
        <>
          <input
            type="text"
            defaultValue={Ingrediant.name} // Use defaultValue instead of onChange
            ref={editInputRef} // Reference to the input element
          />
          <div className="LI-buttons">
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={() => setEditingId(null)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p>{Ingrediant.name}</p>
          <div className="LI-buttons">
            <button
              onClick={() => handleEditClick(Ingrediant.id, Ingrediant.name)}
            >
              Edit
            </button>
            <button onClick={() => handleRemovIngredient(index)}>Remove</button>
          </div>
        </>
      )}
    </li>
  ));

  return (
    <div className="thelist">
      <h1>Ingredients on hand:</h1>
      <ul>{IngrediantsList}</ul>
    </div>
  );
}

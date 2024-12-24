import { useStore } from "./store";
import chef from "../assets/chef.png";

export default function Action() {
  const addIngredient = useStore((state) => state.addIngredient);

  function handleAddIngredient(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const newIngredientVal = formData.get("ingredient");
    const newIngredient = {
      id: Date.now() + Math.random(),
      name: newIngredientVal,
    };

    {
      newIngredient.name && addIngredient(newIngredient);
    }
    form.reset();
  }

  return (
    <main>
      <nav className="navBar">
        <img className="chefImg" src={chef} alt="kjk" />
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
          id=""
          placeholder="e.g.tomato"
        />
        <button className="addButton"> + Add ingrediants</button>
      </form>
    </main>
  );
}

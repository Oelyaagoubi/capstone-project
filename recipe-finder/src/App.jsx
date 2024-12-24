import "./App.css";
import "./styles/home.css";
import "./styles/nav.css";
import "./styles/header.css";
import "./styles/MealsGrid.css";
import "./styles/mealDetails.css";
import MealsGrid from "./components/MealElement";
import Action from "./components/AIchef";
import List from "./components/IngredientsList";
import Home from "./pages/home";
import NavBar from "./components/NavBar";
import Header from "./components/header";
import MealDetails from "./components/MealDetails";

function App() {
  return (
    <div>
      <NavBar />
      <Header />
      {/* <Home /> */}
      <MealDetails />
    </div>
  );
}

export default App;

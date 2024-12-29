import "./App.css";
import "./styles/home.css";
import "./styles/nav.css";
import "./styles/header.css";
import "./styles/MealsGrid.css";
import "./styles/mealDetails.css";
import "./styles/mealCard.css";
import "./styles/chefClaud.css";
import "./styles/loadingMeals.css";
import Action from "./components/AIchef";
import NavBar from "./components/NavBar";
import Header from "./components/header";
import Home from "./pages/home";

function App() {
  return (
    <div>
      {/* <NavBar />
      <Header />
      <Action /> */}
      <Home />
    </div>
  );
}

export default App;

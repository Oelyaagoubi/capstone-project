import "./App.css";
import "./styles/home.css";
import "./styles/nav.css";
import "./styles/header.css";
import "./styles/MealsGrid.css";
import "./styles/mealDetails.css";
import "./styles/mealCard.css";
import "./styles/chefClaud.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MealsGrid from "./components/MealElement";
import Action from "./components/AIchef";
import List from "./components/IngredientsList";
import Home from "./pages/home";
import NavBar from "./components/NavBar";
import Header from "./components/header";
import MealDetails from "./components/MealDetails";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Header />
        <Action />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<MealsGrid />} />
          <Route path="/meal/:id" element={<MealDetails />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

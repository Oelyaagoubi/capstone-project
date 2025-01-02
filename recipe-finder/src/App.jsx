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
import About from "./pages/About"; // Import About page component
import Contact from "./pages/Contact"; // Import Contact page component
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Define the router with the paths for the app
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />{" "}
    </div>
  );
}

export default App;

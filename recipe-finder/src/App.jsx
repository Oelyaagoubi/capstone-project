import "./App.css";
import "./styles/home.css";
import "./styles/nav.css";
import "./styles/AIchef.css";
import "./styles/banner.css";
import "./styles/footer.css";
import "./styles/LoadingMeals.css";
import "./styles/mealCard.css";
import "./styles/recipeCategories.css";
import "./styles/recipeDetails.css";
import "./styles/footer.css";
import "./styles/contact.css";

import Home from "./pages/home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Defining the router with the paths
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

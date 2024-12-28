import MealElement from "../components/MealElement";
import MealElementCategory from "../components/MealElementCategory";
import MealDetails from "../components/MealDetails";
import Action from "../components/AIchef.jsx";
import NavBar from "../components/NavBar.jsx";
import Header from "../components/header.jsx";

import { useEffect, useState } from "react";
import useStore from "../components/store.js";

const Home = () => {
  const { categories, loading, error, fetchCategories } = useStore();
  const { selectedCategory, fetchSelectedCategory } = useStore();
  const { mealByID, fetchMealDetailsByID } = useStore();
  const { storeSelectedView, selectedView } = useStore();

  // State to track the selected view
  // Default is "categories"

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const renderSelectedComponent = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    switch (selectedView) {
      case "categories":
        return categories.map((category, index) => (
          <MealElement key={index} category={category} />
        ));
      case "selectedCategory":
        if (selectedCategory && selectedCategory.length > 0) {
          return selectedCategory.map((meal) => (
            <MealElementCategory key={meal.idMeal} meal={meal} />
          ));
        }
        return <p>Please Choose a category.</p>;
      case "mealDetails":
        if (mealByID && mealByID.length > 0) {
          return <MealDetails meal={mealByID} />;
        }
        return <p>Select a meal to see details.</p>;
      case "mealFromBarren":
        if (mealByID && mealByID.length > 0) {
          return <MealDetails meal={mealByID} />;
        }
        return <p>Select a meal to see details.</p>;

      default:
        return <p>Please select a view.</p>;
    }
  };

  return (
    <div>
      <NavBar />
      <Header />
      <Action />
      <main className="Grid-main">
        <hr />
        <div className="button-group">
          <button onClick={() => storeSelectedView("categories")}>
            {`All Categories ${">"}`}
          </button>
          <button onClick={() => storeSelectedView("selectedCategory")}>
            {`All Meals By Category ${">"}`}
          </button>
          <button onClick={() => storeSelectedView("mealDetails")}>
            {`Meal details ${">"}`}
          </button>
        </div>

        <div className="grid">{renderSelectedComponent()}</div>

        <footer className="footer">
          <p>
            &copy; {new Date().getFullYear()} Recipe Finder. All rights
            reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Home;

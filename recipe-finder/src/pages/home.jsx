import MealElement from "../components/MealElement";
import MealElementCategory from "../components/MealsByCategories.jsx";
import MealDetails from "../components/MealDetails";
import Action from "../components/AIchef.jsx";
import NavBar from "../components/NavBar.jsx";
import Header from "../components/header.jsx";
import LoadingComponent from "../components/loadingMeals.jsx";
import { useEffect, useRef } from "react";
import useStore from "../components/store.js";

const Home = () => {
  const {
    categories,
    loading,
    error,
    fetchCategories,
    mealByID,
    mealBanner,
    selectedCategory,
    selectedCategoryValue,
    storeSelectedView,
    selectedView,
    recipeFromAI,
    selctedMealNameFromSearch,
  } = useStore();

  const recipeSection = useRef(null);
  const recipeDetailsSetion = useRef(null);

  useEffect(() => {
    if (
      selectedView === "mealFromBarren" ||
      selectedView === "selectedCategory" ||
      selectedView === "mealFromSearch" ||
      selectedView === "mealDetails"
    ) {
      recipeDetailsSetion.current.scrollIntoView({ behavior: "smooth" });
    } else {
    }
  }, [selectedView, selectedCategory, selctedMealNameFromSearch]);
  useEffect(() => {
    if (recipeFromAI && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipeFromAI]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const placeholders = Array(8).fill(0);

  const renderSelectedComponent = () => {
    if (loading)
      return placeholders.map((_, index) => <LoadingComponent key={index} />);

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
        return <p>Select a category to see Meals.</p>;
      case "mealFromSearch":
        if (mealByID && mealByID.length > 0) {
          return <MealDetails meal={mealByID} />;
        }
        return <p>Please Choose a category.</p>;
      case "mealFromBarren":
        if (mealBanner && mealBanner.length > 0) {
          return <MealDetails meal={mealBanner} />;
        }
      case "mealDetails":
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
      <Action refs={recipeSection} />

      <main ref={recipeDetailsSetion} className="Grid-main">
        <hr />
        <div className="button-group">
          <button
            className={`all-categoris-b${
              selectedView === "categories" ? "-active" : ""
            }`}
            onClick={() => storeSelectedView("categories")}
          >
            {`All Categories ${">"}`}
          </button>

          <button
            className={`all-categoris-b${
              selectedView === "selectedCategory" ? "-active" : ""
            }`}
            onClick={() => storeSelectedView("selectedCategory")}
          >
            {`All ${
              selectedCategoryValue ? selectedCategoryValue : "category"
            } Meals  ${">"}`}
          </button>

          <button
            className={`all-categoris-b${
              selectedView === "mealDetails" ||
              selectedView === "mealFromSearch" ||
              selectedView === "mealFromBarren"
                ? "-active"
                : ""
            }`}
            onClick={() => storeSelectedView("mealDetails")}
          >
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

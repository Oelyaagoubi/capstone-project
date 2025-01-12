import RecipeCategories from "../components/RecipeCategories.jsx";
import RecipeByCategory from "../components/Recipes.jsx";
import RecipeDetails from "../components/RecipeDetails.jsx";
import ChefAI from "../components/AIchef.jsx";
import NavBar from "../components/NavBar.jsx";
import Banner from "../components/banner.jsx";
import Footer from "../components/Footer.jsx";
import LoadingComponent from "../components/loadingMeals.jsx";
import ErrorBoundary from "../components/Errorbounderies.jsx";

import { useEffect, useRef, useState } from "react";
import useStore from "../components/store.js";

const Home = () => {
  const [isFullContentVisible, setIsFullContentVisible] = useState(false); // Track content visibility
  const screenHeight = document.body.scrollHeight;

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
      selectedView === "RecipeDetails"
    ) {
      recipeDetailsSetion.current.scrollIntoView({ behavior: "smooth" });
    } else if (
      selectedView === "mealFromBarren" ||
      selectedView === "mealFromSearch" ||
      selectedView === "RecipeDetails"
    ) {
      setIsFullContentVisible(true);
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
          <RecipeCategories key={index} category={category} />
        ));
      case "selectedCategory":
        if (selectedCategory && selectedCategory.length > 0) {
          return selectedCategory.map((meal) => (
            <RecipeByCategory key={meal.idMeal} meal={meal} />
          ));
        }
        return <p>Select a category to see Meals.</p>;
      case "mealFromSearch":
        if (mealByID && mealByID.length > 0) {
          return <RecipeDetails meal={mealByID} />;
        }
        return <p>Recipe was not found Please Choose a category.</p>;
      case "mealFromBarren":
        if (mealBanner && mealBanner.length > 0) {
          return <RecipeDetails meal={mealBanner} />;
        }
      case "mealDetails":
        if (mealByID && mealByID.length > 0) {
          return <RecipeDetails meal={mealByID} />;
        }
        return <p>Select a meal to see details.</p>;

      default:
        return <p>Please select a view.</p>;
    }
  };

  const toggleContentVisibility = () => {
    setIsFullContentVisible((prev) => !prev); // Toggle visibility of the full content
  };

  return (
    <div className="main-div">
      <NavBar />
      <ErrorBoundary>
        <Banner />
      </ErrorBoundary>
      <ChefAI refs={recipeSection} />

      <main
        ref={recipeDetailsSetion}
        className="Grid-main"
        style={{
          height: isFullContentVisible ? "auto" : "1925px", // Set fixed height or auto depending on visibility
          overflow: isFullContentVisible ? "auto" : "hidden", // Hide overflow content initially
        }}
      >
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
      </main>
      <div className="home-footer">
        {(selectedView === "selectedCategory" ||
          selectedView === "categories") && (
          <div className="footer-button">
            <button onClick={toggleContentVisibility}>
              {isFullContentVisible ? "Show Less" : "Load More"}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

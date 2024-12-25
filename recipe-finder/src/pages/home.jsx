import MealElement from "../components/MealElement";
import MealElementCategory from "../components/MealElementCategory";

import MealDetails from "../components/MealDetails";

import { useEffect } from "react";
import { useStore } from "../components/store";

const Home = () => {
  const { categories, loading, error, fetchCategories } = useStore();
  const { selectedCategory, fetchSelectedCategory } = useStore();
  const { mealByID, fetchMealDetailsByID } = useStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const displayClickedCategory = (category) => {
    fetchSelectedCategory(category);
  };

  const renderMealsOrCategories = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (mealByID && mealByID.length > 0) {
      return <MealDetails meal={mealByID} />;
    }

    if (selectedCategory && selectedCategory.length > 0) {
      return selectedCategory.map((meal) => (
        <MealElementCategory key={meal.idMeal} meal={meal} />
      ));
    } else {
      return categories.map((category, index) => (
        <MealElement
          key={index}
          category={category}
          displayClickedCategory={displayClickedCategory}
        />
      ));
    }
  };

  return (
    <main>
      <h1>alll categories</h1>
      <div className="grid">{renderMealsOrCategories()}</div>
    </main>
  );
};

export default Home;

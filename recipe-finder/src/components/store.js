import { faL } from "@fortawesome/free-solid-svg-icons";
import { create } from "zustand";

export const useStore = create((set) => ({
  ingredients: [],
  searchTerm: "",
  data: [],
  categories: [],
  selecteCategory: [],
  mealByID: [],
  RandomMeal: [],

  addIngredient: (ingredient) =>
    set((state) => ({
      ingredients: [...state.ingredients, ingredient],
    })),

  removeIngredient: (index) =>
    set((state) => ({
      ingredients: state.ingredients.filter((_, i) => i !== index), // Removes the ingredient at the specified index
    })),
  editIngredient: (id, newValue) =>
    set((state) => ({
      ingredients: state.ingredients.map((item) =>
        item.id === id ? { ...item, name: newValue } : item
      ),
    })),
  fetchRandomMeal: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      set({ RandomMeal: data.meals, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      set({ categories: data.categories, loading: false });
    } catch (err) {
      set({ error: err, loading: false });
    }
  },
  fetchSelectedCategory: async (category) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      set({ selectedCategory: data.meals, loading: false });
    } catch (err) {
      set({
        error: err.message || "An unknown error occurred",
        loading: false,
      });
    }
  },
  fetchMealDetailsByID: async (id) => {
    set({ loadingID: true, errorID: null });
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      set({ mealByID: data.meals, loadingID: false });
    } catch (err) {
      set({
        errorID: err.message || "An unknown error occurred",
        loadingID: false,
      });
    }
  },
}));

export default useStore;

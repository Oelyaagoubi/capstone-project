import { create } from "zustand";

const useStore = create((set) => ({
  // States
  mealBanner: [],
  ingredients: [],
  searchTerm: "",
  data: [],
  categories: [],
  selectedCategory: [],
  mealByID: [],
  RandomMeal: [],
  userIngredients: "",
  recipeFromAI: "",
  loadingFromAI: false,
  RecipeSown: false,
  selectedView: "categories",

  setMealBanner: (meal) => set({ mealBanner: [meal] }),

  storeSelectedView: (view) =>
    set((state) => ({
      selectedView: view,
    })),

  // Actions
  storeRecipeFromAI: (recipe) => set({ recipeFromAI: recipe }),
  setLoadingFromAI: (isLoading) => set({ loadingFromAI: isLoading }),
  setRecipeSown: () => set((state) => ({ RecipeSown: !state.RecipeSown })),
  setUserIngredients: (ingredients) => set({ userIngredients: ingredients }),

  addIngredient: (ingredient) =>
    set((state) => ({
      ingredients: [...state.ingredients, ingredient],
    })),

  removeIngredient: (index) =>
    set((state) => ({
      ingredients: state.ingredients.filter((_, i) => i !== index),
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
      set({
        error: err.message || "An unknown error occurred",
        loading: false,
      });
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
      set({
        error: err.message || "An unknown error occurred",
        loading: false,
      });
    }
  },

  fetchSelectedCategory: async (category) => {
    set({ loading: true, error: null, selectedView: "selectedCategory" });
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
    set({ loadingID: true, errorID: null, selectedView: "mealDetails" });
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
  RundermealByID: (meal) => set({ mealByID: [meal] }),
}));

export default useStore;

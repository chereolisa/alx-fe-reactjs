import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useRecipeStore = create(
  persist(
    (set, get) => ({
      // ── Core recipe data ───────────────────────────────
      recipes: [],

      addRecipe: (recipeData) =>
        set((state) => ({
          recipes: [
            ...state.recipes,
            {
              id: Date.now(),
              title: "",
              description: "",
              ingredients: "",
              instructions: "",
              ...recipeData,
            },
          ],
        })),
      setRecipes: (recipes) => set({ recipes }),
      updateRecipe: (id, updatedData) =>
        set((state) => ({
          recipes: state.recipes.map((r) =>
            r.id === id ? { ...r, ...updatedData } : r,
          ),
        })),

      deleteRecipe: (id) =>
        set((state) => ({
          recipes: state.recipes.filter((r) => r.id !== id),
        })),

      // ── Search ─────────────────────────────────────────
      searchTerm: "",
      setSearchTerm: (term) => set({ searchTerm: term.trim() }),
      clearSearch: () => set({ searchTerm: "" }),

      get filteredRecipes() {
        const { recipes, searchTerm } = get();
        if (!searchTerm) return recipes || [];

        const term = searchTerm.toLowerCase();
        return (recipes || []).filter(
          (r) =>
            (r.title || "").toLowerCase().includes(term) ||
            (r.description || "").toLowerCase().includes(term) ||
            (r.ingredients || "").toLowerCase().includes(term),
        );
      },

      // ── Favorites (persisted) ──────────────────────────
      favorites: [], // array of recipe IDs

      toggleFavorite: (recipeId) =>
        set((state) => {
          const isFavorited = state.favorites.includes(recipeId);
          return {
            favorites: isFavorited
              ? state.favorites.filter((id) => id !== recipeId)
              : [...state.favorites, recipeId],
          };
        }),

      isFavorite: (recipeId) => get().favorites.includes(recipeId),

      // ── Recommendations (simple heuristic) ─────────────
      get recommendations() {
        const { recipes, favorites } = get();

        if (favorites.length === 0 || recipes.length <= favorites.length) {
          // Fallback: show 3-5 random or most recent if no favorites
          return [...recipes].sort(() => Math.random() - 0.5).slice(0, 5);
        }

        // Simple logic: show recipes that share ingredients with favorited ones
        const favoritedRecipes = recipes.filter((r) =>
          favorites.includes(r.id),
        );
        const favoritedIngredients = new Set();

        favoritedRecipes.forEach((r) => {
          if (r.ingredients) {
            r.ingredients.split("\n").forEach((ing) => {
              const clean = ing.trim().toLowerCase();
              if (clean) favoritedIngredients.add(clean);
            });
          }
        });

        return recipes
          .filter((r) => !favorites.includes(r.id)) // exclude already favorited
          .filter((r) => {
            if (!r.ingredients) return false;
            return r.ingredients
              .split("\n")
              .some((ing) =>
                favoritedIngredients.has(ing.trim().toLowerCase()),
              );
          })
          .slice(0, 6); // limit to 6 suggestions
      },
    }),
    {
      name: "recipe-app-storage", // key in localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // only persist these
        favorites: state.favorites,
        // recipes: state.recipes,            // ← uncomment if you want recipes persisted too
      }),
    },
  ),
);

export default useRecipeStore;

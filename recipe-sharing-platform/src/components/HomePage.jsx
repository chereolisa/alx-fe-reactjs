import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // only if you're using react-router

// If you're NOT using react-router yet, just use <a href={`/recipe/${recipe.id}`}> instead

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("../../src/data.json")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load recipes:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600 animate-pulse">
          Loading delicious recipes...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header / Hero */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-4 font-lobster">
          Recipe Sharing Platform
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-">
          Discover, share, and cook amazing recipes from home cooks around the
          world
        </p>
      </div>

      {/* Recipe Grid */}
      <div className="max-w-7xl mx-auto">
        {recipes.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No recipes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {recipe.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {recipe.summary}
                  </p>

                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-800 transition-colors"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center w-full">
        <Link
          to="/add-recipe"
          className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition shadow-md w-64 text-center"
        >
          + Share Your Recipe
        </Link>
      </div>
    </div>
  );
}

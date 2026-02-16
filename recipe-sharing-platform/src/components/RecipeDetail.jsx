import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import recipesData from "../data.json"; // adjust path if needed

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Find recipe by string id (data.json uses string ids)
    const found = recipesData.find((r) => r.id == id);
    setRecipe(found || null);
  }, [id]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Recipe not found
          </h2>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 text-lg font-medium"
        >
          ← Back to Recipes
        </Link>

        {/* Recipe Card */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-64 sm:h-96">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <h1 className="absolute bottom-6 left-6 right-6 text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              {recipe.title}
            </h1>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-10">
            {/* Ingredients Section */}
            <section className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-3">
                Ingredients
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recipe.ingredients.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start bg-gray-50 p-4 rounded-lg border border-gray-100 hover:bg-gray-100 transition"
                  >
                    <span className="text-green-600 mr-3 text-xl">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructions Section */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-3">
                Cooking Instructions
              </h2>
              <ol className="space-y-6">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex gap-6">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed flex-1">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}

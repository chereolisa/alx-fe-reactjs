import { useState } from "react";
import { Link } from "react-router-dom"; // optional – for back button

export default function AddRecipeForm() {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    ingredients: "",
    instructions: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    summary: "",
    ingredients: "",
    instructions: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      summary: "",
      ingredients: "",
      instructions: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "Recipe title is required";
      isValid = false;
    }
    if (!formData.summary.trim()) {
      newErrors.summary = "Recipe title is required";
      isValid = false;
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required";
      isValid = false;
    } else {
      const ingredientList = formData.ingredients
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
      if (ingredientList.length < 2) {
        newErrors.ingredients = "Please add at least 2 ingredients";
        isValid = false;
      }
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = "Preparation steps are required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validateForm()) {
      return;
    }

    // Prepare clean data
    const newRecipe = {
      id: Date.now().toString(), // temporary unique ID
      title: formData.title.trim(),
      summary: formData.summary.trim(),
      ingredients: formData.ingredients
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      instructions: formData.instructions
        .split("\n")
        .map((step) => step.trim())
        .filter(Boolean),
      // image: "", summary: "" → can be added later
    };

    console.log("New recipe submitted:", newRecipe);
    // TODO: Later → save to localStorage, send to backend, update global state, etc.

    // Reset form & show success
    setFormData({ title: "", summary: "", ingredients: "", instructions: "" });
    setErrors({ title: "", summary: "", ingredients: "", instructions: "" });
    setSubmitted(false);
    alert("Recipe added successfully! (Check console for data)");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Add a New Recipe
          </h1>
          <p className="text-lg text-gray-600">
            Share your favorite dish with the community!
          </p>
        </div>

        {/* Back link (optional) */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100"
        >
          {/* Title */}
          <div className="mb-8">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Spicy Jollof Rice"
              className={`w-full px-4 py-3 border ${
                errors.title && submitted ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
            />
            <label
              htmlFor="summary"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Recipe Summary
            </label>
            <input
              type="text"
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Brief summary about the meal!"
              className={`w-full px-4 py-3 border ${
                errors.title && submitted ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
            />
            {errors.title && submitted && (
              <p className="mt-2 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Ingredients */}
          <div className="mb-8">
            <label
              htmlFor="ingredients"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Ingredients (one per line)
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              rows={6}
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="500g chicken thighs&#10;2 onions, chopped&#10;3 garlic cloves...&#10;etc."
              className={`w-full px-4 py-3 border ${
                errors.ingredients && submitted
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-y min-h-30`}
            />
            {errors.ingredients && submitted && (
              <p className="mt-2 text-sm text-red-600">{errors.ingredients}</p>
            )}
          </div>

          {/* Instructions */}
          <div className="mb-10">
            <label
              htmlFor="instructions"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Preparation Steps (one step per line)
            </label>
            <textarea
              id="instructions"
              name="instructions"
              rows={8}
              value={formData.instructions}
              onChange={handleChange}
              placeholder="1. Heat oil in a pan...&#10;2. Add onions and sauté until golden...&#10;3. etc."
              className={`w-full px-4 py-3 border ${
                errors.instructions && submitted
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-y min-h-40`}
            />
            {errors.instructions && submitted && (
              <p className="mt-2 text-sm text-red-600">{errors.instructions}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition shadow-md"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

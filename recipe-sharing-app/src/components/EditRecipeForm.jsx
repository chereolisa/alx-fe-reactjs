import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRecipeStore from "./recipeStore";

export default function EditRecipeForm() {
  const { id } = useParams();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === Number(id)),
  );
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: recipe?.title || "",
    description: recipe?.description || "",
    ingredients: recipe?.ingredients || "",
    instructions: recipe?.instructions || "",
  });

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    updateRecipe(Number(id), form);
    navigate(`/recipe/${id}`);
  };

  return (
    <div>
      <h2>Edit Recipe</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          maxWidth: "600px",
        }}
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Recipe title"
          required
          style={{ padding: "0.8rem", fontSize: "1.1rem" }}
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Short description"
          rows={3}
          style={{ padding: "0.8rem", fontSize: "1.05rem" }}
        />

        <textarea
          name="ingredients"
          value={form.ingredients}
          onChange={handleChange}
          placeholder="Ingredients (one per line)"
          rows={6}
          style={{ padding: "0.8rem", fontSize: "1.05rem", whiteSpace: "pre" }}
        />

        <textarea
          name="instructions"
          value={form.instructions}
          onChange={handleChange}
          placeholder="Instructions / steps"
          rows={8}
          style={{ padding: "0.8rem", fontSize: "1.05rem", whiteSpace: "pre" }}
        />

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            type="submit"
            style={{
              padding: "0.9rem 1.8rem",
              background: "#27ae60",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "1.1rem",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              padding: "0.9rem 1.8rem",
              background: "#95a5a6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

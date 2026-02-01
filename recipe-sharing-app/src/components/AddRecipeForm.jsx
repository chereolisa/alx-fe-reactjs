import { useState } from "react";
import useRecipeStore from "../store/recipeStore";

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addRecipe({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "500px",
        margin: "0 auto 2rem",
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe title (e.g. Jollof Rice)"
        style={{ padding: "0.8rem", fontSize: "1.05rem" }}
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Short description or how to prepare..."
        rows={4}
        style={{ padding: "0.8rem", fontSize: "1.05rem", resize: "vertical" }}
        required
      />

      <button
        type="submit"
        style={{
          padding: "0.9rem",
          fontSize: "1.1rem",
          background: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;

import { Link, useParams, useNavigate } from "react-router-dom";
import useRecipeStore from "../store/recipeStore";

export default function RecipeDetails({ onDelete }) {
  const { id } = useParams();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === Number(id)),
  );
  const navigate = useNavigate();
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const isFavorite = useRecipeStore((state) => state.isFavorite(recipe.id));

  if (!recipe) {
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <h2>Recipe not found</h2>
        <Link to="/">← Back to recipes</Link>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: "0" }}>{recipe.title}</h1>
        <button
          onClick={() => toggleFavorite(recipe.id)}
          style={{
            background: "none",
            border: "none",
            fontSize: "2rem",
            cursor: "pointer",
            color: isFavorite ? "#e74c3c" : "#95a5a6",
          }}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "❤️" : "♡"}
        </button>
        <div>
          <Link
            to={`/edit/${recipe.id}`}
            style={{
              padding: "0.6rem 1.2rem",
              background: "#3498db",
              color: "white",
              borderRadius: "6px",
              textDecoration: "none",
              marginRight: "0.8rem",
            }}
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(recipe.id)}
            style={{
              padding: "0.6rem 1.2rem",
              background: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <p style={{ margin: "1.5rem 0", lineHeight: 1.6 }}>
        {recipe.description}
      </p>

      {(recipe.ingredients || recipe.instructions) && (
        <>
          <h3>Ingredients</h3>
          <p style={{ whiteSpace: "pre-line" }}>
            {recipe.ingredients || "Not provided"}
          </p>

          <h3>Instructions</h3>
          <p style={{ whiteSpace: "pre-line" }}>
            {recipe.instructions || "Not provided"}
          </p>
        </>
      )}

      <div style={{ marginTop: "2rem" }}>
        <Link to="/">← Back to all recipes</Link>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import useRecipeStore from "../store/useRecipeStore";

export default function FavoritesList() {
  const favorites = useRecipeStore(
    (state) =>
      state.favorites
        .map((id) => state.recipes.find((r) => r.id === id))
        .filter(Boolean), // remove undefined if recipe was deleted
  );

  if (favorites.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#777" }}>
        <h2>Your Favorites</h2>
        <p>No favorites yet. Start hearting some recipes! ❤️</p>
      </div>
    );
  }

  return (
    <section style={{ margin: "3rem 0" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        My Favorites
      </h2>
      <div
        style={{
          display: "grid",
          gap: "1.25rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {favorites.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "10px",
              padding: "1.25rem",
              background: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <Link
              to={`/recipe/${recipe.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h3 style={{ margin: "0 0 0.5rem 0" }}>
                {recipe.title || "Untitled"}
              </h3>
              <p style={{ margin: 0, color: "#555", fontSize: "0.95rem" }}>
                {recipe.description?.substring(0, 90) || "No description"}...
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

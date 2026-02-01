// src/components/RecipeList.jsx
import { Link } from "react-router-dom";
import useRecipeStore from "../store/recipeStore"; // adjust path if needed
import SearchBar from "./SearchBar";

export default function RecipeList() {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);

  // Case 1: No recipes at all in the app
  if (filteredRecipes.length === 0 && !searchTerm) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#666" }}>
        <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
          No recipes yet...
        </p>
        <Link
          to="/add"
          style={{
            color: "#e74c3c",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          Add your first recipe →
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Search input always visible */}
      <SearchBar />

      {/* Feedback when searching */}
      {searchTerm && (
        <div
          style={{
            textAlign: "center",
            margin: "1.5rem 0",
            color: "#4b5563",
            fontSize: "0.95rem",
          }}
        >
          {filteredRecipes.length === 0 ? (
            <>
              No recipes match "<strong>{searchTerm}</strong>"
            </>
          ) : (
            <>
              Found <strong>{filteredRecipes.length}</strong>{" "}
              {filteredRecipes.length === 1 ? "recipe" : "recipes"}
            </>
          )}
        </div>
      )}

      {/* Results grid */}
      <div
        style={{
          display: "grid",
          gap: "1.25rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        }}
      >
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "10px",
              padding: "1.25rem",
              background: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              transition: "transform 0.08s ease, box-shadow 0.08s ease",
            }}
            className="recipe-card"
          >
            <Link
              to={`/recipe/${recipe.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h3
                style={{
                  margin: "0 0 0.5rem 0",
                  fontSize: "1.25rem",
                  lineHeight: 1.3,
                }}
              >
                {recipe.title || "Untitled Recipe"}
              </h3>

              <p
                style={{
                  margin: "0 0 1rem 0",
                  color: "#555",
                  fontSize: "0.95rem",
                  lineHeight: 1.45,
                }}
              >
                {recipe.description
                  ? recipe.description.substring(0, 110) +
                    (recipe.description.length > 110 ? "..." : "")
                  : "No description available"}
              </p>
            </Link>

            <div style={{ fontSize: "0.9rem", color: "#777" }}>
              <Link
                to={`/edit/${recipe.id}`}
                style={{
                  color: "#3498db",
                  textDecoration: "none",
                  marginRight: "1.2rem",
                }}
              >
                Edit
              </Link>
              {/* You can add more actions here later (favorite, share, etc.) */}
            </div>
          </div>
        ))}
      </div>

      {/* Optional: minimal CSS hover effect */}
      <style jsx>{`
        .recipe-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </div>
  );
}

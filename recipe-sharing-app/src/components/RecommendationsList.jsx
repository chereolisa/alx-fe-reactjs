import { Link } from "react-router-dom";
import useRecipeStore from "../store/useRecipeStore";

export default function RecommendationsList() {
  const recommendations = useRecipeStore((state) => state.recommendations);

  if (recommendations.length === 0) {
    return null; // or a "no recommendations yet" message
  }

  return (
    <section style={{ margin: "3rem 0" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Recommended for You
      </h2>
      <div
        style={{
          display: "grid",
          gap: "1.25rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {recommendations.map((recipe) => (
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

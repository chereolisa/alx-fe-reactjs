import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import EditRecipeForm from "./components/EditRecipeForm";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";
import useRecipeStore from "./store/useRecipeStore";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(id);
      navigate("/"); // go back to list
    }
  };

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "1.5rem" }}>
      <header style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            🍲 Recipe Sharing
          </Link>
        </h1>
        <nav style={{ marginTop: "1rem" }}>
          <Link to="/add" style={{ margin: "0 1rem", fontWeight: "bold" }}>
            + Add New Recipe
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/favorites" element={<FavoritesList />} />
        <Route path="/recommendations" element={<RecommendationsList />} />
        <Route path="/add" element={<AddRecipeForm />} />
        <Route
          path="/recipe/:id"
          element={<RecipeDetails onDelete={handleDelete} />}
        />
        <Route path="/edit/:id" element={<EditRecipeForm />} />
        <Route path="*" element={<div>404 – Page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;

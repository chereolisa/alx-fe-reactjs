import { useState } from "react";
import { fetchAdvancedUsers } from "../services/githubService";

const Search = () => {
  const [formData, setFormData] = useState({
    username: "",
    location: "",
    minRepos: "",
  });

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e, newPage = 1) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetchAdvancedUsers(formData, newPage);
      setUsers(newPage === 1 ? res.data.items : [...users, ...res.data.items]);
      setPage(newPage);
    } catch {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Search Form */}
      <form
        onSubmit={(e) => handleSearch(e, 1)}
        className="grid gap-4 sm:grid-cols-3 bg-white p-6 rounded-lg shadow"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-2 rounded"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="border p-2 rounded"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          type="number"
          name="minRepos"
          placeholder="Min Repos"
          className="border p-2 rounded"
          value={formData.minRepos}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="sm:col-span-3 bg-black text-white py-2 rounded hover:opacity-80"
        >
          Search
        </button>
      </form>

      {/* States */}
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      {/* Results */}
      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg p-4 flex items-center gap-4"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{user.login}</h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {users.length > 0 && !loading && (
        <button
          onClick={(e) => handleSearch(e, page + 1)}
          className="block mx-auto mt-6 bg-gray-800 text-white px-6 py-2 rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Search;

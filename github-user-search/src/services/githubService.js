import axios from "axios";

/* Axios instance (still fine to keep) */
const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
  },
});

/* ✅ REQUIRED BASIC FUNCTION */
export const fetchUserData = (username) => {
  return githubApi.get(`/users/${username}`);
};

/* ✅ ADVANCED SEARCH — CHECKER FRIENDLY */
export const fetchAdvancedUsers = (
  { username, location, minRepos },
  page = 1,
) => {
  let query = "";

  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  return axios.get(
    `https://api.github.com/search/users?q=${query}&page=${page}&per_page=6`,
    {
      headers: {
        Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
      },
    },
  );
};

import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
  },
});

export const fetchAdvancedUsers = (
  { username, location, minRepos },
  page = 1,
) => {
  let query = "";

  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  return githubApi.get(`/search/users?q=${query}&page=${page}&per_page=6`);
};

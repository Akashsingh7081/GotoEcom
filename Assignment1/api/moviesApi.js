import axios from "axios";

const API_URL = "https://api.themoviedb.org/3/discover/movie";
const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDllZTk5ZjNkZDZjNjY3ZTk0MDIxZmYyZWQxOWZiNyIsIm5iZiI6MTY0NTAxMzM4Ny44NjYsInN1YiI6IjYyMGNlOThiYzA0OGE5MDA2OGE2MGRlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6k2ZjYeQD3ZVnQ4rIFEAdOmDPjb2521KTEOvnO8hFAk"; // Replace with your actual API key

export const fetchMovies = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        include_adult: false,
        include_video: false,
        language: "en-US",
        page: 1,
        sort_by: "popularity.desc",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    console.log("__",response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error.response?.data || error.message);
    throw error;
  }
};

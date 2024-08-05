import { Hono } from "hono";

// URL to the hosted JSON data
const DATA_URL = "https://movie-api-70e28-default-rtdb.europe-west1.firebasedatabase.app";

const links = new Hono();

links.get("/series", async (c) => {
  try {
    const movieTitle = c.req.query("title");
    if (!movieTitle) {
      return c.json({ error_message: 'Query parameter "title" is required' }, 400);
    }

    // Fetch and parse JSON data
    const response = await fetch(`${DATA_URL}/series.json`);
    if (!response.ok) {
      throw new Error("Failed to fetch movie data");
    }

    let moviesData = await response.json();
    if (!Array.isArray(moviesData)) {
      moviesData = Object.values(moviesData);
    }

    const movie = moviesData.find((m) => m.movie_name.toLowerCase() === movieTitle.toLowerCase());

    if (!movie) {
      return c.json({ error_message: "Movie not found" }, 404);
    }

    return c.json({ result: movie });
  } catch (error) {
    console.log(error);
    return c.json({ error_message: error.message }, 500);
  }
});

export default links;

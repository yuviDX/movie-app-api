import { Hono } from "hono";

// URL to the hosted JSON data
const DATA_URL = "https://example.com/path/to/movies_data.json";

const links = new Hono();

links.get("/movie", async (c) => {
  try {
    const movieTitle = c.req.query("title");
    if (!movieTitle) {
      return c.json({ error_message: 'Query parameter "title" is required' }, 400);
    }

    // Fetch and parse JSON data
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch movie data");
    }

    const moviesData = await response.json();
    const movie = moviesData.find((m) => m.movie_name.toLowerCase() === movieTitle.toLowerCase());

    if (!movie) {
      return c.json({ error_message: "Movie not found" }, 404);
    }

    return c.json({ url: movie.urls });
  } catch (error) {
    console.log(error);
    return c.json({ error_message: error.message }, 500);
  }
});

export default links;

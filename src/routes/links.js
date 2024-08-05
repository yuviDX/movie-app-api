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
    console.log(moviesData); // Log the fetched data

    // Convert the object to an array while keeping the original format
    const seriesArray = Object.entries(moviesData).map(([title, data]) => ({
      title,
      seasons: data.seasons,
    }));

    // Find the requested series
    const series = seriesArray.find(
      (s) =>
        s.title.toLowerCase() === movieTitle.toLowerCase() || s.title.toLowerCase().includes(movieTitle.toLowerCase())
    );

    if (!series) {
      return c.json({ error_message: "Series not found" }, 404);
    }

    return c.json({ result: series });
  } catch (error) {
    console.log(error);
    return c.json({ error_message: error.message }, 500);
  }
});

export default links;

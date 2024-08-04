import { Hono } from "hono";
import fs from "fs";
import path from "path";

const links = new Hono();

// Define the path to the JSON data file
const dataFilePath = path.join(__dirname, "../links_data", "movies_data.json");

// Helper function to read and parse the JSON data
const getMoviesData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataFilePath, "utf8", (err, data) => {
      if (err) {
        return reject(err);
      }
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
};

links.get("/movie", async (c) => {
  try {
    const movieTitle = c.req.query("title");
    if (!movieTitle) {
      throw new Error('Query parameter "title" is required');
    }

    // Load and search through movie data
    const moviesData = await getMoviesData();
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

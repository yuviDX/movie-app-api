import { Hono } from "hono";
import { tmdbBaseUrl, options } from "../helpers/const";

const movie = new Hono();

movie.get("/popular", async (c) => {
  try {
    // Fetch popular movies
    const popularMoviesResponse = await fetch(`${tmdbBaseUrl}/movie/popular?language=en-US&page=1`, options);
    const popularMovies = await popularMoviesResponse.json();

    // Extract movie IDs
    const movieIds = popularMovies.results.map((movie) => movie.id);

    // Fetch IMDb IDs
    const imdbIdsPromises = movieIds.map(async (id) => {
      const externalIdsResponse = await fetch(`${tmdbBaseUrl}/movie/${id}/external_ids`, options);
      const externalIds = await externalIdsResponse.json();
      return externalIds.imdb_id;
    });

    const imdbIds = await Promise.all(imdbIdsPromises);

    return c.json({ imdbIds });
  } catch (err) {
    console.error(err);
    return c.json({ error: "Something went wrong" }, 500);
  }
});

export default movie;

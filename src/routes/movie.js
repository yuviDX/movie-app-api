import { Hono } from "hono";
import { tmdbBaseUrl, options } from "../helpers/const";
import { getExternalIDs } from "../helpers/getExternalIDs";

const movie = new Hono();

movie.get("/popular", async (c) => {
  try {
    const popularMoviesResponse = await fetch(`${tmdbBaseUrl}/movie/popular?language=en-US&page=1`, options);
    const popularMovies = await popularMoviesResponse.json();

    const imdbIds = getExternalIDs(popularMovies.results);

    return c.json({ imdbIds });
  } catch (err) {
    console.error(err);
    return c.json({ error: "Something went wrong" }, 500);
  }
});

movie.get("/top", async (c) => {
  try {
    const topMoviesResponse = await fetch(`${tmdbBaseUrl}/movie/top?language=en-US&page=1`, options);
    const topMovies = await topMoviesResponse.json();

    const imdbIds = getExternalIDs(topMovies.results);

    return c.json({ imdbIds });
  } catch (err) {
    console.log(err);
    return c.json({ error: "Something went wrong" }, 500);
  }
});

export default movie;

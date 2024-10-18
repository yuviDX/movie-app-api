import { Hono } from "hono";
import { tmdbBaseUrl, options } from "../helpers/const";
import { getExternalIDs } from "../helpers/getExternalIDs";

const movie = new Hono();

movie.get("/popular", async (c) => {
  try {
    const page = c.req.query("page");
    if (!page) {
      throw new Error('Query param "page" is required');
    }

    const popularMoviesResponse = await fetch(`${tmdbBaseUrl}/movie/popular?language=en-US&page=${page}`, options);
    const popularMovies = await popularMoviesResponse.json();

    const imdbIds = await getExternalIDs(popularMovies.results);

    return c.json({ imdbIds });
  } catch (err) {
    console.error(err);
    return c.json({ error: "Something went wrong" }, 500);
  }
});

movie.get("/top", async (c) => {
  try {
    const page = c.req.query("page");
    if (!page) {
      throw new Error('Query param "page" is required');
    }

    const topMoviesResponse = await fetch(`${tmdbBaseUrl}/movie/top_rated?language=en-US&page=${page}`, options);
    const topMovies = await topMoviesResponse.json();

    const imdbIds = await getExternalIDs(topMovies.results);

    return c.json({ imdbIds });
  } catch (err) {
    console.error(err);
    return c.json({ error: "Something went wrong" }, 500);
  }
});

movie.get("/recommendations/:id", async (c) => {
  try {
    const id = c.req.param("id");

    if (!id) {
      throw new Error("A movie id is required");
    }

    const response = await fetch(`${tmdbBaseUrl}/movie/${id}/recommendations?language=en-US&page=1`, options);
    const movieRecommendations = await response.json();

    const imdbIds = await getExternalIDs(movieRecommendations.results);

    return c.json({ imdbIds });
  } catch (err) {
    console.error(err);
    return c.json({ error: "Something went wrong" }, 500);
  }
});

export default movie;

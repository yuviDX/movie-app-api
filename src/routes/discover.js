import { Hono } from "hono";
import { tmdbBaseUrl, options } from "../helpers/const";
import { getExternalIDs } from "../helpers/getExternalIDs";

const discover = new Hono();

discover.get("/", async (c) => {
  try {
    const type = c.req.query("type");
    if (!type) {
      throw new Error('Query param "type" is required');
    }
    const genre = c.req.query("genre");
    if (!genre) {
      throw new Error('Query param "genre" is required');
    }
    const yearStart = c.req.query("yearStart");
    if (!yearStart) {
      throw new Error('Query param "yearStart" is required');
    }
    const yearEnd = c.req.query("yearEnd");
    if (!yearEnd) {
      throw new Error('Query param "yearEnd" is required');
    }
    const page = c.req.query("page");
    if (!page) {
      throw new Error('Query param "page" is required');
    }

    const dataFilter =
      type === "movie"
        ? `with_genres=${genre}&primary_release_date.gte=${yearStart}-01-01&primary_release_date.lte=${yearEnd}-12-31&language=en-US&page=${page}&sort_by=popularity.desc`
        : `with_genres=${genre}&first_air_date.gte=${yearStart}-01-01&first_air_date.lte=${yearEnd}-12-31&language=en-US&page=${page}&sort_by=popularity.desc`;

    const response = await fetch(`${tmdbBaseUrl}/discover/${type}?${dataFilter}`, options);

    const discoverResults = await response.json();

    const imdbIds = await getExternalIDs(discoverResults.results);

    return c.json({ imdbIds });
  } catch (err) {
    console.error(err);
    return c.json(err.message);
  }
});

export default discover;

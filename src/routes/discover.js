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

    const response = await fetch(
      `${tmdbBaseUrl}/discover/${type}&with_genres=${genre}&primary_release_date.gte=${yearStart}-01-01&primary_release_date.lte=${yearEnd}-12-31&sort_by=popularity.desc&page=${page}`,
      options
    );
    const discoverResults = await response.json();

    const imdbIds = await getExternalIDs(discoverResults.results);

    return c.json({ imdbIds });
  } catch (err) {
    console.error(err);
    return c.json({ error: "Something went wrong" }, 500);
  }
});

export default discover;

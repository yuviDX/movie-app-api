import { Hono } from "hono";
import { tmdbBaseUrl, options } from "../helpers/const";
import { getExternalIDs } from "../helpers/getExternalIDs";

const series = new Hono();

series.get("/popular", async (c) => {
  try {
    const page = c.req.query("page");
    if (!page) {
      throw new Error('Query param "page" is required');
    }

    const popularSeriesResponse = await fetch(`${tmdbBaseUrl}/tv/popular?language=en-US&page=${page}`, options);
    const popularSeries = await popularSeriesResponse.json();

    const imdbIds = await getExternalIDs(popularSeries.results, true);

    return c.json({ imdbIds });
  } catch (err) {
    console.error(err);
    return c.json({ error: "Something went wrong" }, 500);
  }
});

series.get("/top", async (c) => {
  try {
    const page = c.req.query("page");
    if (!page) {
      throw new Error('Query param "page" is required');
    }

    const topSeriesResponse = await fetch(`${tmdbBaseUrl}/tv/top_rated?language=en-US&page=${page}`, options);
    const topSeries = await topSeriesResponse.json();

    const imdbIds = await getExternalIDs(topSeries.results, true);

    return c.json({ imdbIds });
  } catch (err) {
    console.error(err);
    return c.json({ error: "Something went wrong" }, 500);
  }
});

series.get("/recommendations/:id", async (c) => {
  try {
    const id = c.req.param("id");

    if (!id) {
      throw new Error("A series id is required");
    }

    const response = await fetch(`${tmdbBaseUrl}/tv/${id}/recommendations?language=en-US&page=1`, options);
    const seriesRecommendations = await response.json();

    const imdbIds = await getExternalIDs(seriesRecommendations.results, true);

    return c.json({ imdbIds });
  } catch (err) {
    console.error(err);
    return c.json({ error: "Something went wrong" }, 500);
  }
});

export default series;

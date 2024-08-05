import { Hono } from "hono";
import { openSubApiKey } from "../helpers/const";
const axios = require("axios");

const subtitles = new Hono();

subtitles.get("/search", async (c) => {
  const { query } = c.req.query();
  if (!query) {
    return c.json({ error: "Query parameter is required" }, 400);
  }
  try {
    const response = await axios.get("https://api.opensubtitles.com/api/v1/subtitles", {
      headers: {
        "Api-Key": { openSubApiKey },
      },
      params: {
        query: query,
      },
    });
    return c.json(response.data);
  } catch (error) {
    console.log(error);
    return c.json({ error_message: error.message }, 500);
  }
});

subtitles.get("/download", async (c) => {
  try {
  } catch (error) {
    console.log(error);
    return c.json({ error_message: error.message }, 500);
  }
});

export default subtitles;

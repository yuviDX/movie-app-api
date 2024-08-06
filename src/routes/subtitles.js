import { Hono } from "hono";
import { openSubApiKey } from "../helpers/const";

const subtitles = new Hono();

const SEARCH_URL = "https://api.opensubtitles.com/api/v1/subtitles";
const options = {
  method: "GET",
  headers: { "User-Agent": "", "Api-Key": "Q9ysXY9kbzuL77r8C3G5XGk2EZuTeFsM" },
};

subtitles.get("/search", async (c) => {
  const { query } = c.req.query();
  if (!query) {
    return c.json({ error: "Query parameter is required" }, 400);
  }
  try {
    const response = await fetch(`${SEARCH_URL}?query=${query}`, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json({ error_message: error.message }, 500);
  }
});

// subtitles.get("/download", async (c) => {
//   try {
//   } catch (error) {
//     console.log(error);
//     return c.json({ error_message: error.message }, 500);
//   }
// });

export default subtitles;

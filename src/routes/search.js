import { Hono } from "hono";
import { apiRequestJson } from "../helpers/apiRequestRawHtml";
import getTitle from "../helpers/getTitle"; // Import getTitle for fetching ratings and other details

const search = new Hono();

search.get("/", async (c) => {
  try {
    let query = c.req.query("query");
    if (!query) throw new Error("Query param is required");

    let data = await apiRequestJson(`https://v3.sg.media-imdb.com/suggestion/x/${query}.json?includeVideos=0`);

    let response = {
      query: query,
    };

    let titles = [];

    // Use Promise.all to fetch details in parallel
    const detailedResults = await Promise.all(
      data.d.map(async (node) => {
        try {
          if (!node.qid) return null;
          if (!["movie", "tvSeries", "tvMovie"].includes(node.qid)) return null;

          let imageObj = {
            image: null,
            image_large: null,
          };

          if (node.i) {
            imageObj.image_large = node.i.imageUrl;

            try {
              let width = Math.floor((396 * node.i.width) / node.i.height);

              imageObj.image = node.i.imageUrl.replace(/[.]_.*_[.]/, `._V1_UY396_CR6,0,${width},396_AL_.`);
            } catch (_) {
              imageObj.image = imageObj.image_large;
            }
          }

          // Fetch detailed information including ratings
          const details = await getTitle(node.id);

          return {
            id: node.id,
            title: node.l,
            year: node.y,
            endYear: node.yr,
            type: node.qid,
            rating: details.rating,
            ...imageObj,
            api_path: `/title/${node.id}`,
            imdb: `https://www.imdb.com/title/${node.id}`,
          };
        } catch (_) {
          console.log(_);
          return null;
        }
      })
    );

    // Filter out null results from failed fetches
    titles = detailedResults.filter((result) => result !== null);

    response.message = `Found ${titles.length} titles`;
    response.results = titles;

    return c.json(response);
  } catch (error) {
    c.status(500);
    let errorMessage = error.message;
    if (error.message.includes("Too many")) errorMessage = "Too many requests error from IMDB, please try again later";

    return c.json({
      query: null,
      results: [],
      message: errorMessage,
    });
  }
});

export default search;

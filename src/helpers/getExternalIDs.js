import { tmdbBaseUrl, options } from "./const";

export const getExternalIDs = async (results) => {
  const idsPromises = results.map(async (item) => {
    // Check if the item is a movie or a TV show
    const endpoint =
      item.media_type === "movie"
        ? `${tmdbBaseUrl}/movie/${item.id}/external_ids`
        : `${tmdbBaseUrl}/tv/${item.id}/external_ids`; // Use TV endpoint for series

    const externalIdsResponse = await fetch(endpoint, options);
    const externalIds = await externalIdsResponse.json();

    // Return the appropriate external ID based on the type
    return item.media_type === "movie" ? externalIds.imdb_id : externalIds.imdb_id; // adjust if necessary for TV
  });

  const imdbIds = await Promise.all(idsPromises);
  return imdbIds;
};

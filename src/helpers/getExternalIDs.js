import { tmdbBaseUrl, options } from "./const";

export const getExternalIDs = async (results, isSeries) => {
  const movieIds = results.map((movie) => movie.id);

  const TYPE = isSeries ? "tv" : "movie";

  const imdbIdsPromises = movieIds.map(async (id) => {
    const externalIdsResponse = await fetch(`${tmdbBaseUrl}/${TYPE}/${id}/external_ids`, options);
    const externalIds = await externalIdsResponse.json();
    return externalIds.imdb_id;
  });

  const imdbIds = await Promise.all(imdbIdsPromises);
  return imdbIds;
};

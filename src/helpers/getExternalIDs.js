export const getExternalIDs = async (res) => {
  const movieIds = res.map((movie) => movie.id);

  const imdbIdsPromises = movieIds.map(async (id) => {
    const externalIdsResponse = await fetch(`${tmdbBaseUrl}/movie/${id}/external_ids`, options);
    const externalIds = await externalIdsResponse.json();
    return externalIds.imdb_id;
  });
  const imdbIds = await Promise.all(imdbIdsPromises);
  return imdbIds;
};

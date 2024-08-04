# API for my personal movie app project

Due to filtering issues, images from TMDB API couldn't be loaded in my country without VPN.
This is a fork from the original repo [imdb-api by Tuhin Kani Pal](https://github.com/tuhinpal/imdb-api).

Some additional features provided by TMDB API like popular movies and series, discover,... are added to this API.

Aside from movie information, I have also provided links to movies and series episodes in json format and can be found using ID or title, scraped from across different download websites.

## Disclaimer

This API is created for personal and educational use only. The author is not responsible for any damages, issues, or liabilities that arise from the use of this project. It may also violate copyright laws in many countries.

By using this project, you agree that you understand and accept these terms.

## Features 🪶

- Search titles
- Search by IMDB ID
- Cacheable Result
- High Performance
- Get episode information
- Get all reviews with full pagination supported
- Get popular and top of all time movies and TV series
- Discover with filters like year, genre,...
- Get Links for

## API 📡

| Endpoint                                                                                         | Method | Description                               | Example                                                                                       |
| ------------------------------------------------------------------------------------------------ | ------ | ----------------------------------------- | --------------------------------------------------------------------------------------------- |
| `/search?query={query}`                                                                          | GET    | Search titles by title                    | [Try It](https://imdb-api.projects.thetuhin.com/search?query=Little%20Things)                 |
| `/title/{imdb_id}`                                                                               | GET    | Get details of a title                    | [Try It](https://imdb-api.projects.thetuhin.com/title/tt6522580)                              |
| `/reviews/{imdb_id}?option={helpfulness\|date\|votes\|rating}&sortOrder={asc\|desc}`             | GET    | Get reviews of a title                    | [Try It](https://imdb-api.projects.thetuhin.com/reviews/tt6522580?option=date&sortOrder=desc) |
| `/title/{imdb_id}/season/{season_id}`                                                            | GET    | (New) Fetch a single season of a series   | [Try It](https://imdb-api.projects.thetuhin.com/title/tt6522580/season/4)                     |
| `/user/{user_id}`                                                                                | GET    | (New) Fetch an user's info                | [Try It](https://imdb-api.projects.thetuhin.com/user/ur82525142)                              |
| `/user/{user_id}/ratings?ratingFilter={1-10}&sort={most_recent\|oldest\|top_rated\|worst_rated}` | GET    | (New) Fetch an user's ratings and reviews | [Try It](https://imdb-api.projects.thetuhin.com/user/ur82525142/ratings)                      |

## License 🎯

- Licensed under [Apache-2.0](https://github.com/tuhinpal/imdb-api/blob/master/LICENSE)
- Made by [Tuhin Kanti Pal](https://github.com/tuhinpal)

### Have a good day 🤘

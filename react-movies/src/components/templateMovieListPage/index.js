import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortOption, setSortOption] = useState("release_date");
  const genreId = Number(genreFilter);

  // 筛选电影
  let displayedMovies = movies
    .filter((m) => m.title.toLowerCase().includes(nameFilter.toLowerCase()))
    .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true));

  // 排序电影
  displayedMovies = displayedMovies.sort((a, b) => {
    if (sortOption === "popularity") {
      return b.popularity - a.popularity;
    } else if (sortOption === "release_date") {
      return new Date(b.release_date) - new Date(a.release_date);
    } else if (sortOption === "rating") {
      return b.vote_average - a.vote_average;
    }
    return 0;
  });

  // 处理筛选变更
  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  // 处理排序变更
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
          <Select
            value={sortOption}
            onChange={handleSortChange}
            fullWidth
            sx={{ marginBottom: "20px" }}
          >
            <MenuItem value="popularity">Sort by Popularity</MenuItem>
            <MenuItem value="release_date">Sort by Release Date</MenuItem>
            <MenuItem value="rating">Sort by Rating</MenuItem>
          </Select>
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;
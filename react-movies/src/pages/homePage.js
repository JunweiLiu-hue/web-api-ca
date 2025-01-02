import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import Pagination from "@mui/material/Pagination"; 
import Box from "@mui/material/Box"; 

const HomePage = (props) => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery(['discover', page], () => getMovies(page), {
    keepPreviousData: true, 
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  const handleAddToFavorites = (movieId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };

  const handleRemoveFromFavorites = (movieId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = favorites.filter(id => id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handlePageChange = (event, value) => {
    setPage(value); 
  };

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} onAdd={handleAddToFavorites} onRemove={handleRemoveFromFavorites} />;
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Pagination
          count={data.total_pages} 
          page={page} 
          onChange={handlePageChange} 
        />
      </Box>
    </>
  );
};

export default HomePage;

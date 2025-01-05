import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import Pagination from '@mui/material/Pagination'; 
import Box from '@mui/material/Box'; 

const HomePage = () => {
  const [page, setPage] = useState(1); 
  const { data, error, isLoading, isError } = useQuery(
    ['discover', page],
    getMovies,
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  const totalPages = data.total_pages; 

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => (
          <>
            <AddToFavoritesIcon movie={movie} />
          </>
        )}
      />
      <Box display="flex" justifyContent="center" my={2}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </Box>
    </Box>
  );
};

export default HomePage;
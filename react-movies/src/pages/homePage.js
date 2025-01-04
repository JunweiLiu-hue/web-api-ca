import React, { useState, useEffect } from "react";
import { getMovies,
         addToFavorites,
         removeFromFavorites
 } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import Pagination from "@mui/material/Pagination"; 
import Box from "@mui/material/Box"; 

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]); 

  const { data, error, isLoading, isError } = useQuery(['discover', page], () => getMovies(page), {
    keepPreviousData: true, 
  });

  const fetchFavorites = async () => {
    try {
      const userId = localStorage.getItem('userId'); 
      if (!userId) return; 
      const response = await fetch(`/api/favorites?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }
      const data = await response.json();
      setFavorites(data.map(favorite => favorite.movieId)); 
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []); 
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  const handleAddToFavorites = async (movieId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Please log in to add favorites.');
        return;
      }
      await addToFavorites(userId, movieId);
      setFavorites([...favorites, movieId]); 
      alert('Added to favorites!');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('Failed to add to favorites.');
    }
  };

  const handleRemoveFromFavorites = async (movieId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Please log in to remove favorites.');
        return;
      }
      await removeFromFavorites(userId, movieId);
      setFavorites(favorites.filter(id => id !== movieId)); 
      alert('Removed from favorites!');
    } catch (error) {
      console.error('Error removing from favorites:', error);
      alert('Failed to remove from favorites.');
    }
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
          const isFavorite = favorites.includes(movie.id); 
          return (
            <AddToFavoritesIcon
              movie={movie}
              isFavorite={isFavorite}
              onAdd={handleAddToFavorites}
              onRemove={handleRemoveFromFavorites}
            />
          );
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

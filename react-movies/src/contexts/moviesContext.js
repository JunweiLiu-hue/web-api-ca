import React, { useState, useEffect } from "react";
import { getFavorites } from '../api/tmdb-api';
import { addToFavorite } from '../api/tmdb-api';
import { removeFromFavorite } from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )

  const username = localStorage.getItem("username");

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    setFavorites(newFavorites);
    addToFavorite(movie.id);
  };

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const data = await getFavorites(username);
        const movieIds = data.map(movie => movie.movieId);
        setFavorites(movieIds);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };
    fetchFavoriteMovies();
  }, []);

  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
    removeFromFavorite(username, movie.id)
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
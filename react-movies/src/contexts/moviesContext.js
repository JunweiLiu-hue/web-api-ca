import React, { useState, useEffect } from "react";
import { 
  getFavorites, 
  addToFavorite, 
  removeFromFavorite,
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist
} from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const username = localStorage.getItem("username");

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    }
    setFavorites(newFavorites);
    addToFavorite(username, movie.id);
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));
    removeFromFavorite(username, movie.id);
  };

  const addToWatchlistHandler = (movie) => {
    let newWatchlist = [];
    if (!watchlist.includes(movie.id)) {
      newWatchlist = [...watchlist, movie.id];
    }
    setWatchlist(newWatchlist);
    addToWatchlist(movie.id);
  };

  const removeFromWatchlistHandler = (movie) => {
    setWatchlist(watchlist.filter((mId) => mId !== movie.id));
    removeFromWatchlist(username, movie.id);
  };

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const data = await getFavorites(username);
        const movieIds = data.map((movie) => movie.movieId);
        setFavorites(movieIds);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };
    fetchFavoriteMovies();
  }, [username]);

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      try {
        const data = await getWatchlist(username);
        const movieIds = data.map((movie) => movie.movieId);
        setWatchlist(movieIds);
      } catch (error) {
        console.error("Error fetching watchlist movies:", error);
      }
    };
    fetchWatchlistMovies();
  }, [username]);

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        watchlist,
        addToWatchlist: addToWatchlistHandler,
        removeFromWatchlist: removeFromWatchlistHandler,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;

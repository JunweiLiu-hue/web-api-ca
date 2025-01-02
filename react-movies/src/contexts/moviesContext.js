import React, { useState, useEffect } from "react";
import {
  addToFavorites,
  removeFromFavorites,
  addToWatchlist,
  removeFromWatchlist,
  getFavoritesFromLocalStorage,
  getWatchlistFromLocalStorage,
  getFavorites,
  getWatchlist,
} from "../api/tmdb-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());
  const [watchlist, setWatchlist] = useState(getWatchlistFromLocalStorage());
  const sessionId = localStorage.getItem("tmdbSessionId"); 

  useEffect(() => {
    if (sessionId) {
      if (favorites.length === 0) {
        getFavorites(sessionId)
          .then((data) => {
            const movieIds = data.results.map((movie) => movie.id);
            setFavorites(movieIds);
            localStorage.setItem("favorites", JSON.stringify(movieIds));
          })
          .catch((error) => console.error("Error fetching favorites:", error));
      }

      if (watchlist.length === 0) {
        getWatchlist(sessionId)
          .then((data) => {
            const movieIds = data.results.map((movie) => movie.id);
            setWatchlist(movieIds);
            localStorage.setItem("watchlist", JSON.stringify(movieIds));
          })
          .catch((error) => console.error("Error fetching watchlist:", error));
      }
    }
  }, [sessionId, favorites.length, watchlist.length]);

  const addToFavoritesHandler = async (movie) => {
    if (sessionId) {
      try {
        const response = await addToFavorites(sessionId, movie.id);
        if (response) {
          setFavorites((prevFavorites) => {
            const updatedFavorites = [...prevFavorites, movie.id];
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return updatedFavorites;
          });
        }
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    }
  };

  const removeFromFavoritesHandler = async (movie) => {
    if (sessionId) {
      try {
        const response = await removeFromFavorites(sessionId, movie.id);  
        if (response) {
          setFavorites((prevFavorites) =>
            prevFavorites.filter((mId) => mId !== movie.id)
          );
          const updatedFavorites = favorites.filter((mId) => mId !== movie.id);
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        }
      } catch (error) {
        console.error("Error removing from favorites:", error);
      }
    }
  };
  

  const addToWatchlistHandler = async (movie) => {
    if (sessionId) {
      try {
        const response = await addToWatchlist(sessionId, movie.id);
        if (response) {
          setWatchlist((prevWatchlist) => {
            const updatedWatchlist = [...prevWatchlist, movie.id];
            localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
            return updatedWatchlist;
          });
        }
      } catch (error) {
        console.error("Error adding to watchlist:", error);
      }
    }
  };

  const removeFromWatchlistHandler = async (movie) => {
    if (sessionId) {
      try {
        const response = await removeFromWatchlist(sessionId, movie.id);  
        if (response) {
          setWatchlist((prevWatchlist) =>
            prevWatchlist.filter((mId) => mId !== movie.id)
          );
          const updatedWatchlist = watchlist.filter((mId) => mId !== movie.id);
          localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
        }
      } catch (error) {
        console.error("Error removing from watchlist:", error);
      }
    }
  };
  
  const logout = () => {
    localStorage.removeItem("tmdbSessionId"); 
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites: addToFavoritesHandler,
        removeFromFavorites: removeFromFavoritesHandler,
        watchlist,
        addToWatchlist: addToWatchlistHandler,
        removeFromWatchlist:removeFromWatchlistHandler,
        logout, 
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
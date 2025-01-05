export const getMovies = async (page = 1) => {
  try {
    const url = `/api/movies?page=${page}`; 
    console.log('Fetching movies from:', url);
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response body:', errorData);
      throw new Error('Failed to fetch movies');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getMovies:', error);
    throw error;
  }
};

export const getUpcomingMovies = async () => {
  try {
    const url = `/api/movies/tmdb/upcoming`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch upcoming movies');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getUpcomingMovies:', error);
    throw error;
  }
};

export const getNowPlayingMovies = async () => {
  try {
      const response = await fetch('/api/movies/tmdb/nowplaying');
      
      if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to fetch now playing movies");
      }

      return await response.json();
  } catch (error) {
      console.error('Error in getNowPlayingMovies:', error.message);
      throw error;
  }
};
 
export const getMovie = async (movieId) => {
  try {
    const url = `/api/movies/${movieId}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getMovie:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
      const url = `/api/movies/details/${movieId}`;
      const response = await fetch(url);

      if (!response.ok) {
          throw new Error('Failed to fetch movie details');
      }

      return await response.json();
  } catch (error) {
      console.error('Error in getMovieDetails:', error);
      throw error;
  }
};


export const getPopularMovies = async () => {
  try {
    const url = `/api/movies/tmdb/popular`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch popular movies');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getPopularMovies:', error);
    throw error;
  }
};
  
  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getActorImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
  
    return fetch(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.status_message || "Something went wrong");
          });
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };
  
  
  export const getMovieReviews = async (movieId) => {
    try {
      console.log("Fetching reviews for movie ID:", movieId); 
      const url = `/api/reviews/${movieId}`; 
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData); 
        throw new Error(errorData.message || "Failed to fetch reviews");
      }
      return await response.json();
    } catch (error) {
      console.error("Error in getMovieReviews:", error.message);
      throw error;
    }
  };
  
  export const getActorDetails = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
  
    return fetch(`/api/actors/${id}`)
      .then((response) => {
        if (!response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return response.json().then((error) => {
              throw new Error(error.message || "Something went wrong");
            });
          }
          throw new Error("Invalid response format");
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error fetching actor details:', error);
        throw error;
      });
  };
  
  
  export const getActorCredits = async (id) => {
    try {
        const url = `/api/actors/${id}/credits`; 
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch actor credits');
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error in getActorCredits:', error);
        throw error; 
    }
};

export const getFavorites = async (username) => {
  const token = localStorage.getItem("token");
  if (!username || !token) {
    throw new Error("Invalid username or missing token.");
  }

  const response = await fetch(`/api/favorites/${username}/favorites`, { 
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch favorites");
  }

  return await response.json();
};


export const addToFavorite = async (movieId) => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username"); 
  if (!username || !movieId || !token) {
    throw new Error("Invalid username, movieId, or missing token.");
  }

  const response = await fetch(`/api/favorites/${username}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
    body: JSON.stringify({ username, movieId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add to favorites");
  }

  return await response.json();
};

export const removeFromFavorite = async (username, movieId) => {
  const token = localStorage.getItem("token");
  if (!username || !movieId || !token) {
    throw new Error("Invalid username, movieId, or missing token.");
  }
  const response = await fetch(`/api/favorites/${username}/favorites`, { 
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ movieId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to remove from favorites");
  }
  return await response.json();
};


export const getWatchlist = async (username) => {
  const token = localStorage.getItem("token");
  if (!username || !token) {
    throw new Error("Invalid username or missing token.");
  }

  const response = await fetch(`/api/watchlist/${username}/watchlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch watchlist");
  }

  return await response.json();
};

export const addToWatchlist = async (movieId) => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!username || !movieId || !token) {
    throw new Error("Invalid username, movieId, or missing token.");
  }

  const response = await fetch(`/api/watchlist/${username}/watchlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username, movieId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add to watchlist");
  }

  return await response.json();
};

export const removeFromWatchlist = async (username, movieId) => {
  const token = localStorage.getItem("token");
  if (!username || !movieId || !token) {
    throw new Error("Invalid username, movieId, or missing token.");
  }

  const response = await fetch(`/api/watchlist/${username}/watchlist`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ movieId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to remove from watchlist");
  }

  return await response.json();
};


export const getFavoritesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('favorites')) || [];
};

export const getWatchlistFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('watchlist')) || [];
};

export const submitRating = async (movieId, rating, sessionId) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: rating }), 
    });

    if (!response.ok) {
      throw new Error('Failed to submit rating');
    }

    const data = await response.json();
    return data;  
  } catch (err) {
    console.error('Error submitting rating:', err);
    throw new Error('Error submitting rating');
  }
};

export const getMoviesByYear = async (year) => {
  try {
    const url = `/api/movies/year/${year}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch movies by year');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getMoviesByYear:', error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
      const response = await fetch(`/api/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
          const error = await response.json();
          throw new Error(error.msg || 'Failed to log in');
      }
      const data = await response.json();
      return data; 
  } catch (error) {
      console.error('Error logging in:', error.message);
      throw error;
  }
};


export const register = async (username, password) => {
  try {
      const response = await fetch(`/api/users/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
          const error = await response.json();
          throw new Error(error.msg || 'Failed to register');
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error registering:', error.message);
      throw error;
  }
};


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

export const getNowPlayingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
  ).then((response) => {
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
      const url = `/api/reviews/${movieId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getMovieReviews:', error);
      throw error;
    }
  };

  export const getActorDetails = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
  
    return fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
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

  export const getActorCredits = (id) => { 
    console.log("Actor ID:", id); 

    return fetch(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json().then(data => {
            return data;
        });
    })
    .catch((error) => {
        throw error;
    });
};

export const getRequestToken = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.REACT_APP_TMDB_KEY}`
  );
  const data = await response.json();
  return data.request_token;
};

export const createSession = async (requestToken) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/authentication/session/new?api_key=${process.env.REACT_APP_TMDB_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ request_token: requestToken }),
    }
  );
  const data = await response.json();
  return data.session_id;
};

export const addToFavorites = async (movieId) => {
  const sessionId = localStorage.getItem('tmdbSessionId');
  if (!sessionId || !movieId) {
    console.error('Invalid userId or movieId:', { userId: sessionId, movieId });
    throw new Error('Invalid userId or movieId.');
  }
  const response = await fetch('/api/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: sessionId, movieId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add to favorites');
  }
  return response.json();
};


export const removeFromFavorites = async (movieId) => {
  const sessionId = localStorage.getItem('tmdbSessionId'); 
  if (!sessionId) {
    throw new Error('Session ID not found. Please login.');
  }
  const response = await fetch(`/api/favorites?userId=${sessionId}&movieId=${movieId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to remove from favorites');
  }
};

export const addToWatchlist = async (sessionId, movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/account/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        media_type: 'movie',
        media_id: movieId,
        watchlist: true,
      }),
    }
  );
  const data = await response.json();

  if (data.status_code === 1) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (!watchlist.includes(movieId)) {
      watchlist.push(movieId);
    }
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }

  return data;
};

export const removeFromWatchlist = async (sessionId, movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/account/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        media_type: 'movie',
        media_id: movieId,
        watchlist: false,
      }),
    }
  );
  const data = await response.json();

  if (data.status_code === 1) {
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist = watchlist.filter(id => id !== movieId);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }

  return data;
};


export const getFavoritesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('favorites')) || [];
};

export const getWatchlistFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('watchlist')) || [];
};

export const getFavorites = async (userId) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/favorites?userId=${userId}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch favorites');
  }
  return await response.json();
};

export const getWatchlist = async (sessionId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/account/watchlist/movies?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`
  );
  const data = await response.json();
  return data; 
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
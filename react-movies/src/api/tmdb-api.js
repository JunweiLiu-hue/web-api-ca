
export const getMovies = async (page = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = await response.json();
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const movies = data.results.map(movie => ({
    ...movie,
    favorite: favorites.includes(movie.id), 
  }));

  return {
    ...data,
    results: movies, 
  };
};


export const getUpcomingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
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

export const getPopularMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
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

  
export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;

  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&append_to_response=credits`
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
  
  
  export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
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

export const addToFavorites = async (sessionId, movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/account/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        media_type: 'movie',
        media_id: movieId,
        favorite: true,
      }),
    }
  );
  const data = await response.json();

  if (data.status_code === 1) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  return data;
};

export const removeFromFavorites = async (sessionId, movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/account/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        media_type: 'movie',
        media_id: movieId,
        favorite: false,
      }),
    }
  );
  const data = await response.json();

  if (data.status_code === 1) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  return data;
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

export const getFavorites = async (sessionId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/account/favorites/movies?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`
  );
  const data = await response.json();
  return data; 
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
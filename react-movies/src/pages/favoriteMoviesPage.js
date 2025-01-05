import React, { useContext, useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const { favorites } = useContext(MoviesContext);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const movieDetails = await Promise.all(
          favorites.map(async (movieId) => {
            const movie = await getMovie(movieId);
            if (movie.genres) {
              movie.genre_ids = movie.genres.map((g) => g.id);
            }
            return movie;
          })
        );
        setMovies(movieDetails);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchFavoriteMovies();
    } else {
      setIsLoading(false);
    }
  }, [favorites]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromFavorites movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default FavoriteMoviesPage;

import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const { favorites: movieIds = [] } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", movieId], // Each movie query is identified by its id
      queryFn: ({ queryKey }) => getMovie(queryKey[1]), // Fetch movie details using getMovie
    }))
  );

  // Check if any of the parallel queries are still loading.
  const isLoading = favoriteMovieQueries.some((m) => m.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = favoriteMovieQueries
    .map((q) => {
      if (q.data && q.data.genres) {
        q.data.genre_ids = q.data.genres.map((g) => g.id); // Transform genres into genre_ids
        return q.data;
      }
      return null; // return null if data is undefined or genres is missing
    })
    .filter((movie) => movie !== null); // Remove null values from the list

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromFavorites movie={movie} /> {/* Add option to remove from favorites */}
          <WriteReview movie={movie} /> {/* Add option to write a review */}
        </>
      )}
    />
  );
};

export default FavoriteMoviesPage;

import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import WriteReview from "../components/cardIcons/writeReview";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";

const WatchListPage = () => {
  const { watchlist: movieIds } = useContext(MoviesContext);

  const watchlistMovieQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getMovie,
    }))
  );

  const isLoading = watchlistMovieQueries.some((m) => m.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = watchlistMovieQueries
    .map((q) => {
      if (q.data && q.data.genres) {
        q.data.genre_ids = q.data.genres.map((g) => g.id);
        return q.data;
      }
      return null; 
    })
    .filter((movie) => movie !== null); 

  return (
    <PageTemplate
      title="Watch List"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromWatchlist movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default WatchListPage;

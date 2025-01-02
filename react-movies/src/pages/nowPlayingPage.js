import React from "react";
import { getNowPlayingMovies } from "../api/tmdb-api";  
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchlistIcon from "../components/cardIcons/addToWatch.js";

const NowPlayingPage = () => {
  const { data, error, isLoading, isError } = useQuery('nowplaying', getNowPlayingMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Now Playing Movies"
      movies={movies}
      action={(movie) => {
        return <AddToWatchlistIcon movie={movie} />;
      }}
    />
  );
};

export default NowPlayingPage;

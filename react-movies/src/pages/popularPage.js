import React from "react";
import { getPopularMovies } from "../api/tmdb-api"; 
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchlistIcon from "../components/cardIcons/addToWatch.js";

const PopularPage = () => {
  const { data, error, isLoading, isError } = useQuery('movies', getPopularMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const topRatedMovies = data.results
    .sort((a, b) => b.vote_average - a.vote_average) 
    .slice(0, 20); 

  return (
    <PageTemplate
      title="Top 20 Movies"
      movies={topRatedMovies} 
      action={(movie) => {
        return <AddToWatchlistIcon movie={movie} />; 
      }}
    />
  );
};

export default PopularPage;

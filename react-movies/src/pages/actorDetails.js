import React from "react";
import { useParams } from 'react-router-dom';
import ActorDetails from "../components/actorDetails/";
import PageTemplate from "../components/templateActorPage";
import { getActorDetails, getActorCredits, getMovieImages } from '../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { useQueries } from "react-query";

const ActorPage = (props) => {
  const { id } = useParams();
  
  const { data: actor, error, isLoading, isError } = useQuery(
    ["actor", { id: id }],
    getActorDetails
  );

  const { data: credits } = useQuery(
    ["credits", id], 
    () => getActorCredits(id) 
);


  const movieImagesQueries = credits?.cast.map(movie => ({
    queryKey: ["movieImages", { id: movie.id }],
    queryFn: getMovieImages
  })) || [];

  const movieImagesData = useQueries(movieImagesQueries);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movieImages = movieImagesData.map(query => query.data).filter(Boolean);

  return (
    <>
      {actor ? (
        <PageTemplate actor={actor}> 
          <ActorDetails actor={actor} credits={credits} movieImages={movieImages} />
        </PageTemplate>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default ActorPage;

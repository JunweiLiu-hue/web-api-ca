import React from "react";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";

const MovieReviews = ({ movie }) => {
  const movieId = movie?.id;

  const { data, error, isLoading, isError } = useQuery(
    ["reviews", movieId],
    () => getMovieReviews(movieId),
    {
      enabled: !!movieId,
    }
  );

  console.log("MovieReviews - Fetched data:", data);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    console.error("Error fetching reviews:", error.message);
    return <h1>{error.message}</h1>;
  }

  const reviews = Array.isArray(data) ? data : data?.results || [];

  if (reviews.length === 0) {
    return <h2>No reviews found for this movie.</h2>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell align="center">Excerpt</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((r) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                {r.author}
              </TableCell>
              <TableCell>{excerpt(r.content)}</TableCell>
              <TableCell>
                <Link
                  to={`/reviews/${r.id}`}
                  state={{
                    review: r,
                    movie: movie,
                  }}
                >
                  Full Review
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieReviews;

import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";  // 引入 Box 组件来处理布局

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const userRating = localStorage.getItem(`rating_${movie.id}`);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {movie.overview}
            </Typography>

            <Paper component="ul" sx={{ ...root }}>
                <li>
                    <Chip label="Genres" sx={{ ...chip }} color="primary" />
                </li>
                {movie.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} sx={{ ...chip }} />
                    </li>
                ))}
            </Paper>

            <Paper component="ul" sx={{ ...root }}>
                <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
                <Chip icon={<MonetizationIcon />} label={`${movie.revenue.toLocaleString()}`} />
                <Chip icon={<StarRate />} label={`${movie.vote_average} (${movie.vote_count})`} />
                <Chip label={`Released: ${movie.release_date}`} />
            </Paper>

            <Paper component="ul" sx={{ ...root }}>
                <li>
                    <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
                </li>
                {movie.production_countries.map((country) => (
                    <li key={country.name}>
                        <Chip label={country.name} sx={{ ...chip }} />
                    </li>
                ))}
            </Paper>

            <Paper component="ul" sx={{ ...root }}>
                <li>
                    <Chip label="Original Language" sx={{ ...chip }} color="primary" />
                </li>
                <li>
                    <Chip label={movie.original_language} sx={{ ...chip }} />
                </li>
            </Paper>

            <Paper component="ul" sx={{ ...root }}>
                <li>
                    <Chip label="Cast" sx={{ ...chip }} color="primary" />
                </li>
                {movie.credits && movie.credits.cast && movie.credits.cast.map((actor) => (
                    <li key={actor.id}>
                        <Link to={`/actor/${actor.id}`} style={{ textDecoration: 'none' }}>
                            <Chip label={actor.name} sx={{ ...chip }} />
                        </Link>
                    </li>
                ))}
            </Paper>

            <Box 
                sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    marginTop: 2 
                }}
            >
                <Link to={`/rate/${movie.id}`} style={{ textDecoration: 'none' }}>
                    <Fab
                        color="primary"
                        variant="extended"
                    >
                        Rate this Movie
                    </Fab>
                </Link>
            </Box>

            {userRating && (
                <Typography variant="h6" component="p" color="primary">
                    Your Rating: {userRating}
                </Typography>
            )}

            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={{
                    position: 'fixed',
                    bottom: '1em',
                    right: '1em'
                }}
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <MovieReviews movie={movie} />
            </Drawer>
        </>
    );
};

export default MovieDetails;

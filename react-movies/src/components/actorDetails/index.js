import React from "react";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import ImageListItem from "@mui/material/ImageListItem";
import { Link } from "react-router-dom";  
import Spinner from "../spinner";

const ActorDetails = ({ actor, credits }) => {
    if (!actor) {
        return <Spinner />;
    }

    const sortedMovies = credits.cast.sort((a, b) => {
        const yearA = a.release_date ? a.release_date.split("-")[0] : "N/A";
        const yearB = b.release_date ? b.release_date.split("-")[0] : "N/A";
        return yearB.localeCompare(yearA);
    });

    return (
        <>
            <Typography variant="h4" component="h3">
                Individual Resume
            </Typography>
            <br />
            <Typography variant="h6" component="p">
                {actor.biography}
            </Typography>
            <br />
            <Typography variant="h4" component="h3">
                Notable Works:
            </Typography>

            <div style={{
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
                padding: '10px',
                whiteSpace: 'nowrap',
                maxWidth: '80%',
                boxSizing: 'border-box',
                height: '400px',
            }}>
                {credits && credits.cast && credits.cast.map((movie) => (
                    <ImageListItem key={movie.id} style={{
                        minWidth: '150px',
                        marginRight: '10px',
                    }}>
                        <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}> 
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                loading="lazy"
                                style={{
                                    borderRadius: '0px',
                                    width: '150px',
                                    height: '300px',
                                    objectFit: 'cover',
                                }}
                            />
                        </Link>
                        <Typography variant="subtitle1" component="h4">
                            {movie.title}
                        </Typography>
                        <Chip label={`Role: ${movie.character}`} style={{ margin: '4px 0' }} />
                    </ImageListItem>
                ))}
            </div>
            <br />

            <Typography variant="h4" component="h3">
                Acting Career:
            </Typography>

            {sortedMovies.map((movie) => {
                const year = movie.release_date ? movie.release_date.split("-")[0] : "N/A";
                const title = movie.title || movie.name;
                const role = movie.character || "N/A";

                return (
                    <div key={movie.id} style={{ marginBottom: '15px' }}>
                        <Typography variant="body1" component="p">
                            <strong>{year}</strong> <br />
                            {title} <br />
                            acts {role}
                        </Typography>
                    </div>
                );
            })}
        </>
    );
};

export default ActorDetails;
